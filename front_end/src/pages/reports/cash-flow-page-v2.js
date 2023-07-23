import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { cashFlowReportText } from '../../utils/i18n/cash-flow-report-text';
import CashFlowStatementStandard from './components/cash-flow-statement-standard';
import DateRangeControls from './components/date-range-controls';

function CashFlowPageV2() {
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const [cashFlowStatementDto, setCashFlowStatementDto] = React.useState();
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const fetchCashFlowStatementDto = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/cashFlowStatement`, datesToRequest)
            .then(response => {
                console.log(response.data)
                setCashFlowStatementDto(response.data);
                setLoading(false);
            })
            .catch(response => {
                console.log(response);
                setLoading(false);
            })
    }
    return(
        <div>
            <h1>
                {cashFlowReportText[appContext.locale]["Cash Flow Statement"]}
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            parentComponentDataFetchFunction={fetchCashFlowStatementDto}
                            detailedView={detailedView}
                            toggleDetailedView={toggleDetailedView}
                        />
                        <CashFlowStatementStandard
                            cashFlowStatementDto={cashFlowStatementDto}
                            detailedView={detailedView}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default CashFlowPageV2;