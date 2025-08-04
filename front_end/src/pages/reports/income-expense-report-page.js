import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { incomeStatementReportText } from '../../utils/i18n/income-statement-report-text';
import DateRangeControls from './components/date-range-controls';
import IncomeExpenseReport from './components/income-expense-report';

function IncomeExpenseReportPage() {
    const appContext = React.useContext(PageSettings); 
    const params = useParams();

    const [incomeExpenseReportDto, setIncomeExpenseReportDto] = React.useState();
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [loading, setLoading] = React.useState(true);

    const fetchIncomeExpenseReports = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeExpenseReport`, datesToRequest)
            .then(response => {
                setIncomeExpenseReportDto(response.data)
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
                {incomeStatementReportText[appContext.locale]["Income and Expense Report"]} 
            </h3>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            parentComponentDataFetchFunction={fetchIncomeExpenseReports}
                            detailedView={detailedView}
                            toggleDetailedView={toggleDetailedView}
                            defaultStartDate={params.startDate? params.startDate : null}
                            defaultEndDate={params.endDate? params.endDate : null}
                        />
                        <IncomeExpenseReport
                            incomeExpenseReportDto={incomeExpenseReportDto}
                            detailedView={detailedView}
                        />
                    </div>
                }
            </div>
        </div>
    )

}
export default IncomeExpenseReportPage;