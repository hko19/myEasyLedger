import React from 'react';
import {sidebarText} from '../../utils/i18n/sidebar-text';
import { PageSettings } from '../../config/page-settings';
import NewOrganizationForm from './new-organization-form';

function CreateANewOrganization(props) {
    const appContext = React.useContext(PageSettings);
    return(
        <div>
            <h3>
                {sidebarText[appContext.locale]["Create a New Ledger"]}
            </h3>
            <NewOrganizationForm/>
        </div>
    )
}

export default CreateANewOrganization;