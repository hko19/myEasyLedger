import React from 'react'
import { Alert, Card, CardBody } from 'reactstrap';
import { PageSettings } from '../../config/page-settings'
import { incomeStatementRenderText } from '../../utils/i18n/income-statement-render-text';
import { reportsText } from '../../utils/i18n/reports-text';
import { getDateInCurrentYear, getTodayAsDateString, validateDate } from '../../utils/util-fns';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { journalEntriesText } from '../../utils/i18n/journal-entries-text';
import AccountTransactionsReport from './components/account-transactions-report';
import { balanceSheetRenderText } from '../../utils/i18n/balance-sheet-render-text';
import StyledSelect from '../../components/misc/styled-select';

function AccountTransactionsReportPage(props) {
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();

    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);
    const [loading, setLoading] = React.useState(true);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);
    const [accountOptions, setAccountOptions] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);
    const [selectedAccountId, setSelectedAccountId] = React.useState(null);
    const [currentAccountTypeId, setCurrentAccountTypeId] = React.useState(null);

    const [fetchedReport, setFetchedReport] = React.useState(null);
    const [datesToRequest, setDatesToRequest] = React.useState({
        label: "Custom",
        startDate: beginningOfCurrentFiscalYear,
        endDate: today
    })

    const handleUpdateReportButton = event => {
        event.preventDefault();
        fetchReport(selectedAccountId);
    }
    const handleSelectDateRangePreset = selectedOption => {
        if (selectedOption) {
            setDatesToRequest({
                label: selectedOption.label,
                startDate: selectedOption.object.startDate,
                endDate: selectedOption.object.endDate
            })
        }
    }
    const handleChangeStartDate = (date) => {
        let newDatesToRequest = datesToRequest;
        newDatesToRequest = {
            label: "Custom",
            startDate: date,
            endDate: newDatesToRequest.endDate
        }
        setDatesToRequest(newDatesToRequest)
    }
    const handleChangeEndDate = (date) => {
        let newDatesToRequest = datesToRequest;
        newDatesToRequest = {
            label: "Custom",
            startDate: newDatesToRequest.startDate,
            endDate: date
        }
        setDatesToRequest(newDatesToRequest)
    }

    const validateDatesToRequest = datesToRequest => {
        if (!(validateDate(datesToRequest.startDate) && validateDate(datesToRequest.endDate))) {
            return false;
        }
        return true;
    }

    const fetchDateRangePresets = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
            setDateRangePresets(response.data);
        })
    }

    const fetchAccounts = () => {
        let accountTypePrefixes = {
            1: journalEntriesText[appContext.locale]["[A] "],
            2: journalEntriesText[appContext.locale]["[L] "],
            3: journalEntriesText[appContext.locale]["[O] "],
            4: journalEntriesText[appContext.locale]["[I] "],
            5: journalEntriesText[appContext.locale]["[E] "]
        }
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountsWithEntries`)
            .then(response => {
                const formattedAccounts = response.data.filter(account => !account.hasChildren).map(account => {
                    return ({
                        value: account.accountId,
                        label: accountTypePrefixes[account.accountTypeId] +
                            (account.accountCode ? account.accountCode + " - " + account.accountName : account.accountName),
                        object: account
                    });
                });
                setAccountOptions(formattedAccounts);
                /*if (formattedAccounts.length > 0) {
                    setSelectedAccountId(formattedAccounts[0].value);
                }*/
            })
            .catch(console.log);

    }

    const fetchReport = (accountId) => {
        axios.get(`${API_BASE_URL}/reports/accountTransactionsReport/account/${accountId}/${datesToRequest.startDate}/${datesToRequest.endDate}`).then(response => {
            setFetchedReport(response.data);
        })
    }

    React.useEffect(() => {
        setLoading(true);
        fetchDateRangePresets();
        fetchAccounts();
        setLoading(false);
    }, [])

    React.useEffect(() => {
        let isMounted = true;
        if (selectedAccountId) {
            fetchReport(selectedAccountId)
            if (isMounted) {
                let selectedAccount = accountOptions.find(accountOption => accountOption.object.accountId === selectedAccountId).object;
                setCurrentAccountTypeId(selectedAccount.accountTypeId)
            }
        }
        return (() => {
            isMounted = false;
        })
    }, [selectedAccountId])


    return (
        <div>
            <h3 className="page-header">
                {reportsText[appContext.locale]["Account Transactions Report"]}
            </h3>
            <Card className="very-rounded shadow-sm bg-light my-4">
                <CardBody>
                    <Alert isOpen={invalidDateAlert} color="danger">
                        {incomeStatementRenderText[appContext.locale]["Invalid date(s) selected."]}
                    </Alert>
                    <form onSubmit={handleUpdateReportButton}>
                        <div className="mb-2">
                            <h2 className="h5 my-0">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                        </div>
                        <div className="d-none d-md-block">
                            <div>
                                <div className="d-flex w-100 align-items-center mb-3">
                                    <StyledSelect
                                        className="col-4 px-0"
                                        options={dateRangePresets}
                                        menuShouldScrollIntoView={false}
                                        onChange={selectedOption => handleSelectDateRangePreset(selectedOption)}
                                        placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                        value={datesToRequest.label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest.label)}
                                    />
                                    <label className="my-0 text-end col-1 px-2">
                                        {incomeStatementRenderText[appContext.locale]["From:"]}
                                    </label>
                                    <div className="col-3">
                                        <input
                                            type="date"
                                            placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                            className="form-control" value={datesToRequest.startDate}
                                            onChange={event => handleChangeStartDate(event.target.value)}
                                            style={{ colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light' }}
                                        />
                                    </div>
                                    <label className="my-0 text-end col-1 px-2">
                                        {incomeStatementRenderText[appContext.locale]["To:"]}
                                    </label>
                                    <div className="col-3">
                                        <input
                                            type="date"
                                            placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                            className="form-control" value={datesToRequest.endDate}
                                            onChange={event => handleChangeEndDate(event.target.value)}
                                            style={{ colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light' }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <div className="col-6 d-flex align-items-center">
                                        <label className="my-0 px-2 text-nowrap">
                                            {reportsText[appContext.locale]["Account:"]}
                                        </label>
                                        <StyledSelect
                                            className="px-0 w-100"
                                            options={accountOptions}
                                            menuShouldScrollIntoView={false}
                                            onChange={selectedOption => setSelectedAccountId(selectedOption.object.accountId)}
                                            value={accountOptions.find(accountOption => accountOption.object.accountId === selectedAccountId)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary width-200">
                                        {incomeStatementRenderText[appContext.locale]["Update report"]}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-md-none">
                            <div>
                                <div className="d-flex mb-2 justify-content-between">
                                    <StyledSelect
                                        className="col-12 px-0"
                                        options={dateRangePresets}
                                        menuShouldScrollIntoView={false}
                                        onChange={selectedOption => handleSelectDateRangePreset(selectedOption)}
                                        placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                        value={datesToRequest.label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest.label)}
                                    />
                                </div>
                                <div className="d-flex justify-content-between text-start align-items-center mb-2">
                                    <label className="my-0 col-3 px-0">
                                        {incomeStatementRenderText[appContext.locale]["From:"]}
                                    </label>
                                    <input
                                        type="date"
                                        placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                        className="form-control"
                                        value={datesToRequest.startDate}
                                        onChange={event => handleChangeStartDate(event.target.value)}
                                        style={{ colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light' }}
                                    />
                                </div>
                                <div className="d-flex justify-content-between text-start align-items-center mb-2">
                                    <label className="my-0 col-3 px-0">
                                        {incomeStatementRenderText[appContext.locale]["To:"]}
                                    </label>
                                    <input
                                        type="date"
                                        placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                        className="form-control"
                                        value={datesToRequest.endDate}
                                        onChange={event => handleChangeEndDate(event.target.value)}
                                        style={{ colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light' }}
                                    />
                                </div>
                                <div className="d-flex mb-2 justify-content-between">
                                    <StyledSelect
                                        className="px-0 w-100"
                                        options={accountOptions}
                                        menuShouldScrollIntoView={false}
                                        onChange={selectedOption => setSelectedAccountId(selectedOption.object.accountId)}
                                        placeholder={reportsText[appContext.locale]["Account"]}
                                        value={accountOptions.find(accountOption => accountOption.object.accountId === selectedAccountId)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-large w-100">
                                    {incomeStatementRenderText[appContext.locale]["Update report"]}
                                </button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>
            {fetchedReport
                ? <AccountTransactionsReport
                    reportData={fetchedReport}
                    accountTypeId={currentAccountTypeId}
                />
                : null
            }
        </div>
    )
}
export default AccountTransactionsReportPage