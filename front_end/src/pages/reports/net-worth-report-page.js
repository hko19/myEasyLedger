import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { netWorthReportText } from '../../utils/i18n/net-worth-report-text';
import DateRangeControls from './components/date-range-controls';
import NetWorthReport from './components/net-worth-report';

function NetWorthReportPage() {
    const appContext = React.useContext(PageSettings); 
    const params = useParams();

    const [netWorthReportDto, setNetWorthReportDto] = React.useState();
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [loading, setLoading] = React.useState(true);

    const fetchNetWorthReports = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/netWorthReport`, datesToRequest)
            .then(response => {
                setNetWorthReportDto(response.data)
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
                {netWorthReportText[appContext.locale]["Net Worth Report"]} 
            </h3>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            parentComponentDataFetchFunction={fetchNetWorthReports}
                            detailedView={detailedView}
                            toggleDetailedView={toggleDetailedView}
                            singleDate
                            defaultEndDate={params.endDate? params.endDate : null}
                        />
                        <NetWorthReport
                            netWorthReportDto={netWorthReportDto}
                            detailedView={detailedView}
                        />
                    </div>
                }
            </div>
        </div>
    )

}
export default NetWorthReportPage;