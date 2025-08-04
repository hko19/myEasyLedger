import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { reportTypeListText } from '../../utils/i18n/report-type-list-text';
import { reportsText } from '../../utils/i18n/reports-text';
import { formatCurrency, getPercentage } from '../../utils/util-fns';
import DateRangeControls from './components/date-range-controls';
import ExpensesByVendorPieCharts from './components/expenses-by-vendor-pie-charts';
import ExpensesByVendorReport from './components/expenses-by-vendor-report';

function ExpensesByVendorPage() {
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const [expensesByVendorReportDto, setExpensesByVendorReportDto] = React.useState();

    const [dateRanges, setDateRanges] = React.useState([]);
    const [pieChartVendorData, setPieChartVendorData] = React.useState([]);

    const convertAmountsIntoCurrencyAndPercentage = (amountsArray, totalArray) => {
        let returnedArray = []
        for (let i = 0; i < totalArray.length; i++) {
            returnedArray.push(formatCurrency(appContext.locale, appContext.currency, amountsArray[i]) + ` (${getPercentage(amountsArray[i], totalArray[i])}%)`);
        }
        return returnedArray;
    }

    const fetchExpensesByVendorReports = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/expensesByVendorReport`, datesToRequest)
            .then(response => {
                let dto = response.data;
                let vendorData = [];
                dto.dateRanges.forEach(dateRange => {
                    vendorData.push({
                        vendorNames: [],
                        amounts: []
                    })
                })
                dto.vendors.forEach(vendor => {
                    vendorData.forEach(vendorDataObject => {
                        if (vendor.vendorName) {
                            vendorDataObject.vendorNames.push(vendor.vendorName);
                        } else {
                            vendorDataObject.vendorNames.push(reportsText[appContext.locale]["No vendor"]);
                        }
                    })
                    vendor.amounts.forEach((amount, i) => {
                        vendorData[i].amounts.push(amount);
                    })
                    vendor.amounts = convertAmountsIntoCurrencyAndPercentage(vendor.amounts, dto.totalExpenses);
                })
                dto.totalExpenses.forEach((totalExpenseNumber, i) => {
                    vendorData[i].totalExpenses = totalExpenseNumber
                })
                setExpensesByVendorReportDto(dto);
                setDateRanges(dto.dateRanges);
                setPieChartVendorData(vendorData);
                setLoading(false);
            })
            .catch(response => {
                console.log(response);
                setLoading(false);
            })
    }

    return (
        <div>
            <h3 className="page-header">
                {reportTypeListText[appContext.locale]["Expense Distribution (by Vendor)"]} 
            </h3>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            parentComponentDataFetchFunction={fetchExpensesByVendorReports}
                            noDetailedView
                        />
                        <ExpensesByVendorPieCharts
                            dateRanges={dateRanges}
                            vendorData={pieChartVendorData}
                            loading={loading}
                        />
                        <hr className="d-none d-lg-flex"/>
                        <ExpensesByVendorReport
                            expensesByVendorReportDto={expensesByVendorReportDto}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default ExpensesByVendorPage;