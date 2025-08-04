import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { accountDetailsEditorText } from '../../utils/i18n/account-details-editor-text';
import { vendorsText } from '../../utils/i18n/vendors-text';

//required props: handleAddButton [func]
function VendorsTitleBarStandard(props) {
    const appContext = React.useContext(PageSettings);
    const [permissionTooltip, setPermissionTooltip] = React.useState(false);
    const togglePermissionTooltip = () => setPermissionTooltip(!permissionTooltip);
    
    return(
        <div className="d-flex justify-content-between align-items-center">
            <div className="h3">
                {vendorsText[appContext.locale]["Vendors"]}
            </div>
            <div id="add-a-vendor-button">
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    disabled={appContext.currentPermissionTypeId < 2}
                    onClick={props.handleAddButton}
                >
                    {vendorsText[appContext.locale]["Add a Vendor"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    isOpen={permissionTooltip}
                    toggle={togglePermissionTooltip}
                    fade={false}
                    target="add-a-vendor-button"
                    placement="left"
                >
                    {accountDetailsEditorText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
        </div>
    )
}

export default VendorsTitleBarStandard;