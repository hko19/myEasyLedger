import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { incomeStatementReportText } from '../../utils/i18n/income-statement-report-text';
import DateRangeControls from './components/date-range-controls';
import IncomeStatementReport from './components/income-statement-report';

function IncomeStatementPage() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();
    const [loading, setLoading] = React.useState(true);
    const [incomeStatementDto, setIncomeStatementDto] = React.useState();
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const fetchIncomeStatements = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeStatement`, datesToRequest)
            .then(response => {
                setIncomeStatementDto(response.data);
                setLoading(false);
            })
            .catch(response => {
                console.log(response);
                setLoading(false);
            })
    }

    return (
        <div>
            <h3>
                {incomeStatementReportText[appContext.locale]["Income Statement Report"]}
            </h3>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            parentComponentDataFetchFunction={fetchIncomeStatements}
                            detailedView={detailedView}
                            toggleDetailedView={toggleDetailedView}
                            defaultStartDate={params.startDate? params.startDate: null}
                            defaultEndDate={params.endDate? params.endDate: null}
                        />
                        <IncomeStatementReport
                            incomeStatementDto={incomeStatementDto}
                            detailedView={detailedView}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
export default IncomeStatementPage;