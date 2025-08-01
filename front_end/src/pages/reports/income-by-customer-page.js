import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { reportTypeListText } from '../../utils/i18n/report-type-list-text';
import { reportsText } from '../../utils/i18n/reports-text';
import { formatCurrency, getPercentage } from '../../utils/util-fns';
import DateRangeControls from './components/date-range-controls';
import IncomeByCustomerPieCharts from './components/income-by-customer-pie-charts';
import IncomeByCustomerReport from './components/income-by-customer-report';

function IncomeByCustomerPage() {
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const [incomeByCustomerReportDto, setIncomeByCustomerReportDto] = React.useState();

    const [dateRanges, setDateRanges] = React.useState([]);
    const [pieChartCustomerData, setPieChartCustomerData] = React.useState([]);

    const convertAmountsIntoCurrencyAndPercentage = (amountsArray, totalArray) => {
        let returnedArray = []
        for (let i = 0; i < totalArray.length; i++) {
            returnedArray.push(formatCurrency(appContext.locale, appContext.currency, amountsArray[i]) + ` (${getPercentage(amountsArray[i], totalArray[i])}%)`);
        }
        return returnedArray;
    }

    const fetchIncomeByCustomerReports = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeByCustomerReport`, datesToRequest)
            .then(response => {
                let dto = response.data;
                let customerData = [];
                dto.dateRanges.forEach(dateRange => {
                    customerData.push({
                        customerNames: [],
                        amounts: []
                    })
                })
                dto.customers.forEach(customer => {
                    customerData.forEach(customerDataObject => {
                        if (customer.customerName) {
                            customerDataObject.customerNames.push(customer.customerName);
                        } else {
                            customerDataObject.customerNames.push(reportsText[appContext.locale]["No customer"]);
                        }
                    })
                    customer.amounts.forEach((amount, i) => {
                        customerData[i].amounts.push(amount);
                    })
                    customer.amounts = convertAmountsIntoCurrencyAndPercentage(customer.amounts, dto.totalIncome);
                })
                dto.totalIncome.forEach((totalIncomeNumber, i) => {
                    customerData[i].totalIncome = totalIncomeNumber
                })
                setIncomeByCustomerReportDto(dto);
                setDateRanges(dto.dateRanges);
                setPieChartCustomerData(customerData);
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
                {reportTypeListText[appContext.locale]["Income Distribution (by Customer)"]} 
            </h3>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            parentComponentDataFetchFunction={fetchIncomeByCustomerReports}
                            noDetailedView
                        />
                        <IncomeByCustomerPieCharts
                            dateRanges={dateRanges}
                            customerData={pieChartCustomerData}
                            loading={loading}
                        />
                        <hr className="d-none d-lg-flex"/>
                        <IncomeByCustomerReport
                            incomeByCustomerReportDto={incomeByCustomerReportDto}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default IncomeByCustomerPage;