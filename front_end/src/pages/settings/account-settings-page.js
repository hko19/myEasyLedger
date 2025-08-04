import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import LanguageSettingsModal from './language-settings-modal';
import ChangePasswordModal from './change-password-modal';
import { Card, CardBody } from 'reactstrap';
import AppearanceSettingsModal from './appearance-settings-modal';
import ChangeNameModal from './change-name-modal';
import ChangeResultsPerPageModal from './change-results-per-page-modal';
function AccountSettingsPage() {
    const appContext = React.useContext(PageSettings);

    const [languageSettingsModal, setLanguageSettingsModal] = React.useState(false);
    const toggleLanguageSettingsModal = () => {
        setLanguageSettingsModal(!languageSettingsModal);
    }
    const [changePasswordModal, setChangePasswordModal] = React.useState(false);
    const toggleChangePasswordModal = () => {
        setChangePasswordModal(!changePasswordModal);
    }
    const [appearanceSettingsModal, setAppearanceSettingsModal] = React.useState(false);
    const toggleAppearanceSettingsModal = () => {
        setAppearanceSettingsModal(!appearanceSettingsModal);
    }
    const [changeNameModal, setChangeNameModal] = React.useState(false);
    const toggleChangeNameModal = () => {
        setChangeNameModal(!changeNameModal);
    }

    const [changeResultsPerPageModal, setChangeResultsPerPageModal] = React.useState(false);
    const toggleChangeResultsPerPageModal = () => {
        setChangeResultsPerPageModal(!changeResultsPerPageModal);
    }

    return (
        <div>
            <h3 className="page-header">
                {settingsText[appContext.locale]["Account Settings"]}
            </h3>
            <Card className="very-rounded mb-3 shadow-sm">
                <CardBody>
                    <div>
                        <Link replace to="#" className="pseudo-tr d-flex justify-content-between align-items-center" onClick={toggleLanguageSettingsModal}>
                            <div className="indent pseudo-td">{settingsText[appContext.locale]["Language Settings"]}</div>
                            <div className="pe-2 text-muted">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="pseudo-tr d-flex justify-content-between align-items-center" onClick={toggleAppearanceSettingsModal}>
                            <div className="indent pseudo-td">{settingsText[appContext.locale]["Appearance Settings"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="pseudo-tr d-flex justify-content-between align-items-center" onClick={toggleChangePasswordModal}>
                            <div className="indent pseudo-td">{settingsText[appContext.locale]["Change Password"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="pseudo-tr d-flex justify-content-between align-items-center" onClick={toggleChangeNameModal}>
                            <div className="indent pseudo-td">{settingsText[appContext.locale]["Change Name"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="pseudo-tr d-flex justify-content-between align-items-center" onClick={toggleChangeResultsPerPageModal}>
                            <div className="indent pseudo-td">{settingsText[appContext.locale]["Results per Page"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </div>
                </CardBody>
            </Card>
            <LanguageSettingsModal isOpen={languageSettingsModal} toggle={toggleLanguageSettingsModal}/>
            <AppearanceSettingsModal isOpen={appearanceSettingsModal} toggle={toggleAppearanceSettingsModal}/>
            <ChangePasswordModal isOpen={changePasswordModal} toggle={toggleChangePasswordModal} />
            <ChangeNameModal isOpen={changeNameModal} toggle={toggleChangeNameModal} />
            <ChangeResultsPerPageModal isOpen={changeResultsPerPageModal} toggle={toggleChangeResultsPerPageModal} />
        </div>

    )
}

export default AccountSettingsPage;