import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryTitleBarStandard({ className, handleCreateAJournalEntryButton }) {
    const appContext = React.useContext(PageSettings);
    const [addAnEntryTooltip, setAddAnEntryTooltip] = React.useState(false);
    const toggleAddAnEntryTooltip = () => setAddAnEntryTooltip(!addAnEntryTooltip);

    return (
        <div className={"d-none d-sm-flex justify-content-between align-items-center " + className}>
            <h3 className="my-0">
                {journalEntriesText[appContext.locale]["Journal Entries"]}
            </h3>
            <div id="add-an-entry-button">
                <button
                    className="btn btn-primary"
                    onClick={handleCreateAJournalEntryButton}
                    disabled={appContext.currentPermissionTypeId < 2}
                >
                    {journalEntriesText[appContext.locale]["Add an entry"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    target="add-an-entry-button"
                    isOpen={addAnEntryTooltip}
                    toggle={toggleAddAnEntryTooltip}
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

export default JournalEntryTitleBarStandard;