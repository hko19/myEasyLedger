import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function TransactionsTitleBarStandard({ className, handleCreateTransactionButton }) {
    const appContext = React.useContext(PageSettings);
    const [buttonTooltip, setButtonTooltip] = React.useState(false);
    const toggleButtonTooltip = () => setButtonTooltip(!buttonTooltip);

    return (
        <div className={"d-none d-sm-flex justify-content-between align-items-center " + className}>
            <h3 className="my-0">
                {journalEntriesText[appContext.locale]["Transactions"]}
            </h3>
            <div id="add-a-transaction-button">
                <button
                    className="btn btn-primary"
                    onClick={handleCreateTransactionButton}
                    disabled={appContext.currentPermissionTypeId < 2}
                >
                    {journalEntriesText[appContext.locale]["Add a new transaction"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    target="add-a-transaction-button"
                    isOpen={buttonTooltip}
                    toggle={toggleButtonTooltip}
                    fade={false}
                    placement="left"
                >
                    {journalEntriesText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }

        </div>
    )
}

export default TransactionsTitleBarStandard;