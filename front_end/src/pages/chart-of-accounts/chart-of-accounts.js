import axios from 'axios';
import React from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, Nav, NavItem, TabContent, TabPane, Tooltip } from 'reactstrap';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { ACCOUNT_TYPE_OPTIONS, API_BASE_URL } from '../../utils/constants';
import { chartOfAccountsText } from '../../utils/i18n/chart-of-accounts-text';
import AccountListItem from './components/account-list-item';
import AccountDetailsEditor from './components/account-details-editor';
import StyledSelect from '../../components/misc/styled-select';

function ChartOfAccounts(props) {
    /** Renders a Chart of Accounts. This component uses pills tabs for the different account types. The url param this.props.match.params.activeTabId indicates the current open tab, in order for tab history to be preserved.
     *  this.props.match.params.activeTabId should always match the accountType.id of the accountType being currently viewed. 
    */
    const appContext = React.useContext(PageSettings);
    const accountTypeOptions = ACCOUNT_TYPE_OPTIONS(appContext.locale);
    const currentAccountTypeId = useParams().activeTabId;
    const history = useHistory();

    const [accounts, setAccounts] = React.useState([]);
    const [accountTypes, setAccountTypes] = React.useState([]);
    const [selectedAccountId, setSelectedAccountId] = React.useState(null);
    const [selectedParentAccount, setSelectedParentAccount] = React.useState(null);
    const [editAccountModal, setEditAccountModal] = React.useState(false);
    const [createMode, setCreateMode] = React.useState(true);
    const [createAnAccountButtonTooltip, setCreateAnAccountButtonTooltip] = React.useState(false);

    const toggleCreateAnAccountButtonTooltip = () => setCreateAnAccountButtonTooltip(!createAnAccountButtonTooltip);
    const toggleEditAccountModal = () => setEditAccountModal(!editAccountModal);

    const fetchData = () => {
        axios.get(`${API_BASE_URL}/accountType`).then(response => {
            setAccountTypes(response.data);
        })
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`).then(response => {
            setAccounts(response.data);
        })
    }

    const handleAddAnAccountButton = () => {
        setCreateMode(true);
        setSelectedAccountId(null);
        setSelectedParentAccount(null);
        setEditAccountModal(true);
    }

    const handleAddAChildAccountButton = parentAccount => {
        setCreateMode(true);
        setSelectedAccountId(null);
        setSelectedParentAccount(parentAccount);
        setEditAccountModal(true);
    }

    const handleEditAccountButton = (event, account) => {
        event.stopPropagation();
        setCreateMode(false);
        setSelectedAccountId(account.accountId);
        setEditAccountModal(true);
    }

    const canAddChildren = account => {
        if (account.parentAccountId != null) {
            return false;
        } else if (account.debitTotal != 0 || account.creditTotal != 0) {
            if (account.hasChildren) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h3>
                {chartOfAccountsText[appContext.locale]["Chart of Accounts"]}
            </h3>
            <Card className="very-rounded my-4 shadow-sm bg-light">
                <CardBody>
                    <Nav pills justified>
                        {!accountTypes
                            ? <LoadingSpinner big />
                            : <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="d-none d-lg-flex">
                                    {accountTypes.map(accountType => { //render a pills navlink for each accountType returned by the server, with the active accountType being the one that has an id that matches the url param.
                                        return (
                                            <NavItem key={accountType.id}>
                                                <NavLink
                                                    className={"nav-link " + (currentAccountTypeId == accountType.id ? "active" : "cursor-pointer")}
                                                    to={`/chart-of-accounts/${accountType.id}`}
                                                >
                                                    <div className="d-sm-block px-3">
                                                        {chartOfAccountsText[appContext.locale][accountType.name]}
                                                    </div>
                                                </NavLink>
                                            </NavItem>
                                        );
                                    })}
                                </div>
                                <div className="d-lg-none w-50">
                                    <StyledSelect
                                        options={accountTypeOptions}
                                        value={accountTypeOptions.find(accountTypeOption => accountTypeOption.value == currentAccountTypeId)}
                                        onChange={selectedOption => history.push(`/chart-of-accounts/${selectedOption.value}`)}
                                    />
                                </div>
                                <div id="create-an-account-button">
                                    <button
                                        className="btn font-size-standard btn-primary ms-3 "
                                        onClick={handleAddAnAccountButton}
                                        disabled={appContext.currentPermissionTypeId < 2}
                                    >
                                        {chartOfAccountsText[appContext.locale]["Create an account"]}
                                    </button>
                                </div>
                            </div>
                        }
                    </Nav>
                </CardBody>
            </Card>
            <Card className="very-rounded shadow-sm">
                <CardBody>
                    <TabContent activeTab={currentAccountTypeId}>
                        {!accountTypes
                            ? <LoadingSpinner big />
                            : accountTypes.map(accountType => {
                                return (
                                    <TabPane tabId={accountType.id.toString()} key={accountType.id.toString()}>
                                        {accounts
                                            .filter(account => account.accountTypeId === accountType.id && !account.parentAccountId)
                                            .map(account => {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <AccountListItem
                                                            account={account}
                                                            handleEditAccountButton={handleEditAccountButton}
                                                            indent={0}
                                                        />
                                                        {account.hasChildren
                                                            ? <div className="d-flex pseudo-tr">
                                                                <div className="vertical-line ms-4"></div>
                                                                <div className="w-100">
                                                                    {accounts.filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                        .map(childAccount => {
                                                                            return (
                                                                                <AccountListItem
                                                                                    key={childAccount.accountId}
                                                                                    account={childAccount}
                                                                                    handleEditAccountButton={handleEditAccountButton}
                                                                                    className=""
                                                                                />
                                                                            )
                                                                        })
                                                                    }
                                                                    {appContext.currentPermissionTypeId >= 2
                                                                        ? <div
                                                                            className="clickable pseudo-tr d-flex justify-content-between align-items-center text-muted"
                                                                            onClick={() => handleAddAChildAccountButton(account)}
                                                                        >
                                                                            <div className="pseudo-td ">
                                                                                <i className="ion ion-md-add fa-fw fa-lg"></i> {chartOfAccountsText[appContext.locale]["Add a new child account..."]}
                                                                            </div>
                                                                            <div className="pseudo-td"></div>
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </div>
                                                            </div>
                                                            : canAddChildren(account)
                                                                ? <div className="d-flex pseudo-tr">
                                                                    <div className="vertical-line ms-4"></div>
                                                                    <div className="w-100">
                                                                        <div
                                                                            className="clickable pseudo-tr d-flex justify-content-between align-items-center text-muted"
                                                                            onClick={() => handleAddAChildAccountButton(account)}
                                                                        >
                                                                            <div className="pseudo-td ">
                                                                                <i className="ion ion-md-add fa-fw fa-lg"></i> {chartOfAccountsText[appContext.locale]["Add a new child account..."]}
                                                                            </div>
                                                                            <div className="pseudo-td"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                : null
                                                        }
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </TabPane>
                                )
                            })
                        }
                    </TabContent>
                </CardBody>
            </Card>

            <AccountDetailsEditor
                isOpen={editAccountModal}
                toggle={toggleEditAccountModal}
                selectedAccountId={selectedAccountId}
                fetchData={fetchData}
                createMode={createMode}
                accountTypeId={currentAccountTypeId}
                selectedParentAccount={selectedParentAccount}
            />

            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    target="create-an-account-button"
                    fade={false}
                    isOpen={createAnAccountButtonTooltip}
                    toggle={toggleCreateAnAccountButtonTooltip}
                >
                    {chartOfAccountsText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }

        </>
    )
}

export default ChartOfAccounts;