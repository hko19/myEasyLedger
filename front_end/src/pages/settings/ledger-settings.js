import React from 'react';
import OrganizationRoster from './components/organization-roster';
import {settingsText} from '../../utils/i18n/settings-text';
import { PageSettings } from '../../config/page-settings';
import OrganizationSettings from './components/organization-settings';

function LedgerSettings(props) {
    const appContext = React.useContext(PageSettings);
    return(
        <div>
            <h3 className="page-header">
                {settingsText[appContext.locale]["Ledger Settings"]}
            </h3>
            <OrganizationSettings organizationId={props.match.params.organizationId} />
            <OrganizationRoster organizationId={props.match.params.organizationId}/>
        </div>
    )
}

export default LedgerSettings;