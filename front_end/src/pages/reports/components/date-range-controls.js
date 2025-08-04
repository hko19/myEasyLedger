/**
 * DateRangeControls component
 * 
 * Renders controls for selecting date ranges and presets for financial reports.
 * Allows users to select custom or preset date ranges, compare multiple ranges,
 * and toggle detailed view options. Handles validation and triggers data fetches
 * based on selected date ranges.
 *
 * @component
 * @param {Object} props - Component props
 * @param {function} props.parentComponentDataFetchFunction - Async function to fetch data, receives an array of date range DTOs.
 * @param {boolean} props.detailedView - Whether detailed view is enabled.
 * @param {function} props.toggleDetailedView - Function to toggle detailed view.
 * @param {boolean} props.noDetailedView - If true, hides the detailed view toggle.
 * @param {boolean} props.singleDate - If true, only displays end dates (no start dates).
 * @param {string} [props.defaultStartDate] - Optional default start date.
 * @param {string} [props.defaultEndDate] - Optional default end date.
 * @returns {JSX.Element} The rendered component.
 */

import React from 'react';
import { Alert, Card, CardBody } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { Link } from 'react-router-dom';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import StyledSelect from '../../../components/misc/styled-select';
import { getDateInCurrentYear, getTodayAsDateString, validateDate } from '../../../utils/util-fns';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';

//parentComponentDataFetchFunction should be an async function that takes a 'datesToRequest' argument. This will be the dateRangeDto array that is sent as the request body.
//noDetailedView and singleDate should be booleans.
//noDetailedView hides the detailedView toggle. singleDate makes this component only display endDates: no startDates.
function DateRangeControls({parentComponentDataFetchFunction, detailedView, 
    toggleDetailedView, noDetailedView, singleDate, defaultStartDate, defaultEndDate}) {
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();
    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);

    const [datesToRequest, setDatesToRequest] = React.useState([{
        label: "Custom",
        startDate: defaultStartDate ? defaultStartDate : beginningOfCurrentFiscalYear,
        endDate: defaultEndDate ? defaultEndDate : today
    }]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);

    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);
    const fetchData = async () => {
        await parentComponentDataFetchFunction(datesToRequest);
    }

    const handleUpdateReportButton = async (event) => {
        event.preventDefault();
        setInvalidDateAlert(false);
        if (validateDatesToRequest(datesToRequest)) {
            fetchData()
        } else {
            setInvalidDateAlert(true);
        }
    }

    const validateDatesToRequest = dateRangeObjects => {
        let returnedBoolean = true
        dateRangeObjects.forEach(dateRangeObject => {
            if (!validateDate(dateRangeObject.endDate)) {
                returnedBoolean = false;
            }
            if (!singleDate) {
                if (!validateDate(dateRangeObject.startDate)) {
                    returnedBoolean = false;
                }
            }
        })
        return returnedBoolean;
    }

    const handleRemoveDateRangeButton = i => {
        let datesArray = datesToRequest.slice();
        datesArray.splice(i, 1);
        setDatesToRequest(datesArray);
    }

    const handleSelectDateRangePreset = (selectedOption, i) => {
        if (selectedOption) {
            let dateToRequestObject = {
                label: selectedOption.label,
                name: selectedOption.label,
                startDate: selectedOption.object.startDate,
                endDate: selectedOption.object.endDate
            };
            let newDatesToRequestArray = datesToRequest.slice();
            newDatesToRequestArray[i] = dateToRequestObject;
            setDatesToRequest(newDatesToRequestArray);
        }
    }

    const handleChangeStartDate = (date, i) => {
        let newDatesToRequestArray = datesToRequest.slice();
        newDatesToRequestArray[i] = {
            label: "Custom", 
            name: "Custom", 
            startDate: date, 
            endDate: newDatesToRequestArray[i].endDate
        }
        setDatesToRequest(newDatesToRequestArray)
    }

    const handleChangeEndDate = (date, i) => {
        let newDatesToRequestArray = datesToRequest.slice();
        newDatesToRequestArray[i] = {
            label: "Custom", 
            name: "Custom", 
            startDate: newDatesToRequestArray[i].startDate, 
            endDate: date
        }
        setDatesToRequest(newDatesToRequestArray)
    }

    const handleCompareButton = () => {
        let endDatesArray = datesToRequest.slice();
        endDatesArray.push({
            label: "Custom", 
            name: "Custom", 
            startDate: beginningOfCurrentFiscalYear,
            endDate: today}
        )
        setDatesToRequest(endDatesArray);
    }

    React.useEffect(() => {
        async function fetchDatePresetsAndData() {
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
                setDateRangePresets(response.data);
            })
            await fetchData();
        }
        fetchDatePresetsAndData();
    }, [])

    return(
        <Card className="very-rounded shadow-sm bg-light my-4">
            <CardBody className="">
                <Alert isOpen={invalidDateAlert} color="danger">
                    {incomeStatementRenderText[appContext.locale]["Invalid date(s) selected."]}
                </Alert>
                <form onSubmit={handleUpdateReportButton}>
                    <div className="mb-2">
                        <h2 className="h5 my-0">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                    </div>
                    <div className="d-none d-md-block">
                        {datesToRequest.map((dateObject, i) => {
                            return (
                                <div key={i}>
                                    {datesToRequest.length > 1
                                    ?   <div className="font-weight-semibold my-1 d-flex align-items-center">
                                            {incomeStatementRenderText[appContext.locale]["Date range"] + " " + (i + 1)}
                                            <button className="btn btn-light py-0 px-1 mx-1 border-0" onClick={() => handleRemoveDateRangeButton(i)}>
                                                <i className="ion ion-md-close fa-fw"></i>
                                            </button>
                                        </div>
                                    : null}
                                    <div className="d-flex w-100 align-items-center mb-2">
                                        <StyledSelect
                                            className="col-4 px-0"
                                            options={dateRangePresets}
                                            menuShouldScrollIntoView={false}
                                            onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                            placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                            value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                        />
                                        {singleDate
                                            ? <>
                                                <label className="col-2 px-1 px-sm-2 text-end my-0" htmlFor={`end-date-${i}`}>
                                                    {balanceSheetRenderText[appContext.locale]["As of:"]} 
                                                </label>
                                                <div className="col-6">
                                                    <input 
                                                        type="date" 
                                                        id={`end-date-${i}`}
                                                        className="form-control align-self-center" 
                                                        placeholder={balanceSheetRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                        value={datesToRequest[i].endDate} 
                                                        onChange={event => handleChangeEndDate(event.target.value, i)} 
                                                        style = {{colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light'}}
                                                    />
                                                </div>
                                            </>
                                            : <>
                                                <label className="my-0 text-end col-1 px-2">
                                                    {incomeStatementRenderText[appContext.locale]["From:"]} 
                                                </label>
                                                <div className="col-3">
                                                    <input 
                                                        type="date" 
                                                        placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                        className="form-control" value={datesToRequest[i].startDate} 
                                                        onChange={event => handleChangeStartDate(event.target.value, i)} 
                                                        style = {{colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light'}}
                                                    />
                                                </div>
                                                <label className="my-0 text-end col-1 px-2">
                                                    {incomeStatementRenderText[appContext.locale]["To:"]} 
                                                </label>
                                                <div className="col-3">
                                                    <input 
                                                        type="date" 
                                                        placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                        className="form-control" value={datesToRequest[i].endDate} 
                                                        onChange={event => handleChangeEndDate(event.target.value, i)}
                                                        style = {{colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light'}}
                                                    />
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-md-none">
                        {datesToRequest.map((dateObject, i) => {
                            return (
                                <div key={i}>
                                    <div className="d-flex my-1 justify-content-between">
                                        <div className="font-weight-semibold d-flex align-items-center">
                                            {incomeStatementRenderText[appContext.locale]["Date range"] + (datesToRequest.length > 1? (" " + (i + 1)) : "" )}
                                            <button 
                                                className={"btn btn-light py-0 px-1 mx-1 border-0 " + (datesToRequest.length > 1 ? "" : " invisible")} 
                                                onClick={() => handleRemoveDateRangeButton(i)}
                                                type="button"
                                            >
                                                <i className="ion ion-md-close fa-fw"></i>
                                            </button>
                                        </div>
                                        <StyledSelect
                                            className="col-6 px-0"
                                            options={dateRangePresets}
                                            menuShouldScrollIntoView={false}
                                            onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                            placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                            value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                        />
                                    </div>
                                    {singleDate 
                                        ? <div className="d-flex justify-content-between text-start align-items-center mb-2">
                                            <label className="my-0 col-3 px-0">
                                                {balanceSheetRenderText[appContext.locale]["As of:"]} 
                                            </label>
                                            <input 
                                                type="date" 
                                                placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                                className="form-control" 
                                                value={datesToRequest[i].endDate} 
                                                onChange={event => handleChangeEndDate(event.target.value, i)} 
                                                style = {{colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light'}}
                                            />
                                        </div>
                                        : <>
                                            <div className="d-flex justify-content-between text-start align-items-center my-1">
                                                <label className="my-0 col-3 px-0">
                                                    {incomeStatementRenderText[appContext.locale]["From:"]} 
                                                </label>
                                                <input 
                                                    type="date" 
                                                    placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                                    className="form-control" 
                                                    value={datesToRequest[i].startDate} 
                                                    onChange={event => handleChangeStartDate(event.target.value, i)} 
                                                    style = {{colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light'}}
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
                                                    value={datesToRequest[i].endDate} 
                                                    onChange={event => handleChangeEndDate(event.target.value, i)} 
                                                    style = {{colorScheme: appContext.colorScheme === 'dark' ? 'dark' : 'light'}}
                                                />
                                            </div>
                                        </>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    {datesToRequest.length < 3
                        ?   <div className="mb-2">
                                <Link replace to="#" onClick={handleCompareButton} className="text-decoration-none">
                                    <i className="ion ion-md-add"></i> {incomeStatementRenderText[appContext.locale]["Compare"]}
                                </Link>
                            </div>
                        : null
                    }
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <div>
                            <div className={"form-check form-switch " + (noDetailedView ? "d-none" : "")}>
                                <input type="checkbox" role="switch" id="detailedViewCheckbox" className="form-check-input" value={detailedView} onChange={toggleDetailedView} />
                                <label htmlFor="detailedViewCheckbox" className="my-0 form-check-label">{incomeStatementRenderText[appContext.locale]["Detailed View"]}</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary width-200" onClick={handleUpdateReportButton}>
                            {incomeStatementRenderText[appContext.locale]["Update report"]}
                        </button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default DateRangeControls;