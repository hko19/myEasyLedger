import React from 'react';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL, CURRENCY_OPTIONS, LOCALE_OPTIONS } from '../../utils/constants';
import { sidebarText } from '../../utils/i18n/sidebar-text';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import StyledSelect from '../misc/styled-select';
import { Card, CardBody } from 'reactstrap';

function NewOrganizationForm(props) {
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const currencyOptions = CURRENCY_OPTIONS(appContext.locale);
    const defaultCurrencyValue = LOCALE_OPTIONS.find(localeOption => localeOption.value === appContext.locale).defaultCurrency;
    const [organizationNameInput, setOrganizationNameInput] = React.useState('');
    const [selectedCurrency, setSelectedCurrency] = React.useState(defaultCurrencyValue ? defaultCurrencyValue : appContext.currency);
    const [isEnterprise, setIsEnterprise] = React.useState(false);

    const handleChangeIsEnterprise = (event) => {
        setIsEnterprise(event.target.value === "true" ? true : false)
    }

    const handleSaveButton = async () => {
        let requestBody = {
            name: organizationNameInput,
            currency: selectedCurrency,
            isEnterprise: isEnterprise
        };
        await axios.post(`${API_BASE_URL}/organization`, requestBody).then(async response => {
            console.log(response);
            await appContext.fetchUserInfo(appContext.personId);
            history.push("/");
        }).catch(console.log);
    }


    return (
        <Card className="very-rounded shadow-sm mb-3">
            <CardBody>
                <div className="my-3">
                    <div className="mb-3 row">
                        <label className="col-xl-3 col-form-label">
                            {sidebarText[appContext.locale]["Enter a name for this ledger"] + ":"}
                        </label>
                        <div className="col-xl-5">
                            <input
                                type="text"
                                className="form-control"
                                value={organizationNameInput}
                                onChange={event => setOrganizationNameInput(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-xl-3 col-form-label">
                            {sidebarText[appContext.locale]["Select a currency for this ledger"] + ":"}
                        </label>
                        <div className="col-xl-5">
                            <StyledSelect
                                options={currencyOptions}
                                onChange={selectedOption => setSelectedCurrency(selectedOption.value)}
                                value={currencyOptions.find(currencyOption => currencyOption.value == selectedCurrency)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-xl-3 mb-2">
                            {sidebarText[appContext.locale]["Create a ledger using"] + ":"}
                        </div>
                        <div className="col-xl-6">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    value={false}
                                    id="is-enterprise-false"
                                    name="is-enterprise"
                                    checked={!isEnterprise}
                                    onChange={handleChangeIsEnterprise}
                                />
                                <label className="mx-2 form-check-label" htmlFor="is-enterprise-false">
                                    {sidebarText[appContext.locale]["Single-entry accounting"]}
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    value={true}
                                    id="is-enterprise-true"
                                    name="is-enterprise"
                                    checked={isEnterprise}
                                    onChange={handleChangeIsEnterprise}
                                />
                                <label className="mx-2 form-check-label" htmlFor="is-enterprise-true">
                                    {sidebarText[appContext.locale]["Double-entry accounting"]}
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleSaveButton}>{sidebarText[appContext.locale]["Create this ledger"]}</button>

                </div>
            </CardBody>
        </Card>
    )
}

export default NewOrganizationForm;