import React from 'react';
import { PageSettings } from '../../config/page-settings';
import ReportTypeList from './components/report-type-list.js';
import {reportsText} from '../../utils/i18n/reports-text.js';
import LoadingSpinner from '../../components/misc/loading-spinner';
function Reports() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>

            <h3> 
                {reportsText[appContext.locale]["Reports"]}
            </h3>
            <div>
                {appContext.isLoading? <LoadingSpinner big /> : <ReportTypeList />}
            </div>
		</div>
    )


}

export default Reports;