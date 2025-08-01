import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { accountDetailsEditorText } from '../../utils/i18n/account-details-editor-text';
import { customersText } from '../../utils/i18n/customers-text';
import { vendorsText } from '../../utils/i18n/vendors-text';

//required props: handleAddButton [func]
function CustomersTitleBarStandard(props) {
    const appContext = React.useContext(PageSettings);
    const [permissionTooltip, setPermissionTooltip] = React.useState(false);
    const togglePermissionTooltip = () => setPermissionTooltip(!permissionTooltip);
    
    return(
        <div className="d-flex justify-content-between align-items-center">
            <div className="h3">
                {customersText[appContext.locale]["Customers"]}
            </div>
            <div id="add-a-customer-button">
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    disabled={appContext.currentPermissionTypeId < 2}
                    onClick={props.handleAddButton}
                >
                    {customersText[appContext.locale]["Add a Customer"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    isOpen={permissionTooltip}
                    toggle={togglePermissionTooltip}
                    fade={false}
                    target="add-a-customer-button"
                    placement="left"
                >
                    {accountDetailsEditorText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
        </div>
    )
}

export default CustomersTitleBarStandard;