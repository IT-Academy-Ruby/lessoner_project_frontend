import "./about.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { THEME, useTheme } from "../../../../utils/useTheme";
import {Button} from "../../../Button";
import { ReactComponent as Facebook } from "../../../icons/navbar/facebook.svg";
import { ReactComponent as Instagram } from "../../../icons/navbar/instagram.svg";
import { ReactComponent as Linkedin } from "../../../icons/navbar/linkedin.svg";
import { ReactComponent as Network } from "../../../icons/navbar/network.svg";
import { TeamMemberCard } from "./teamMemberCard";
import aboutUsDark from "../../../../assets/about-us-dark.svg";
import aboutUsLight from "../../../../assets/about-us-light.svg";
import classNames from "classnames";
import logo from "../../../../assets/about-who-we-are.svg";
import rocket from "../../../../assets/about-our-mission.svg";
import starsDark from "../../../../assets/about-us-stars-dark.svg";
import starsLight from "../../../../assets/about-us-stars-light.svg";
import teamDark from "../../../../assets/Team-dark.svg";
import teamLight from "../../../../assets/Team-light.svg";
import { teamMembers } from "../../../../teamMembers";
import { useState } from "react";

type tabProperties = {
  title: string,
  key: string
}

export const About = () => {
  const theme = useTheme();
  const imageLogo = theme === THEME.DARK ? aboutUsDark : aboutUsLight;
  const imageStars = theme === THEME.DARK ? starsDark : starsLight;
  const team = theme === THEME.DARK ? teamDark : teamLight;
  const intl = useIntl();

  const ourTeamTabsNames = [
    { title: intl.formatMessage({ id: "app.about.tab.aboutUs" }),
      key: "aboutUs" },
    { title: intl.formatMessage({ id: "app.about.tab.founders" }),
      key: "founders" },
    { title: intl.formatMessage({ id: "app.about.tab.projectManagement" }),
      key: "projectManagement" },
    { title: intl.formatMessage({ id: "app.about.tab.businessAnalysis" }),
      key: "businessAnalysis" },
    { title: intl.formatMessage({ id: "app.about.tab.design" }),
      key: "design" },
    { title: intl.formatMessage({ id: "app.about.tab.backend" }),
      key: "backend" },
    { title: intl.formatMessage({ id: "app.about.tab.frontend" }),
      key: "frontend" },
    { title: intl.formatMessage({ id: "app.about.tab.qa" }),
      key: "qa" },
  ];
  const [activeTab, setActiveTab] = useState(ourTeamTabsNames[0]);

  const getTeamByRole = (role: string) => {
    switch (role) {
    case "founders":
      return (
        teamMembers.filter(member => member.role.includes("IT-Academy") ||
          member.role.includes("PO"))
      );
    case "projectManagement":
      return (
        teamMembers.filter(member => member.role.includes("Project"))
      );
    case "businessAnalysis":
      return (
        teamMembers.filter(member => member.role.includes("Business"))
      );
    case "design":
      return (
        teamMembers.filter(member => member.role.includes("Designer") ||
          member.role.includes("UX/UI designer"))
      );
    case "backend":
      return (
        teamMembers.filter(member => member.role.includes("Backend") ||
          member.secondRole && member.secondRole.includes("Backend"))
      );
    case "frontend":
      return (
        teamMembers.filter(member => member.role.includes("Frontend") ||
          member.secondRole && member.secondRole.includes("Frontend"))
      );
    case "qa":
      return (
        teamMembers.filter(member => member.role.includes("QA"))
      );
    default:
      return [];
    }
  };

  const ourTeamTabs = (tabs: Array<tabProperties>) => {
    return tabs.map(tab => {
      return (
        <div key={tab.key}>
          <Button
            buttonType="button"
            buttonText={tab.title}
            onClick={() => setActiveTab(tab)}
            className={classNames("button-about-team",
              { "button-about-team-active": activeTab.key === tab.key })}
          />
        </div>
      );
    });
  };

  const tabContent = () => {
    if (activeTab.key === ourTeamTabsNames[0].key) {
      return (
        <div className="about-team-content">
          <div>
            <div className="about-our-team-header">
              {<FormattedMessage id="app.about.aboutUs" />}
              <img src={imageStars} />
            </div>
            {<FormattedMessage id="app.about.aboutUsDescription" />}
          </div>
          <img src={team} alt="our team" />
        </div>
      );
    } else {
      return (
        <div className="about-team-roles">
          <div className="about-team-role-title">{activeTab.title}</div>
          <div className="about-team-cards">
            {getTeamByRole(activeTab.key).map(member =>
              <TeamMemberCard key={member.id}
                name={member.name}
                city={member.city}
                secondRole={member.secondRole}
                role={member.role}
                photo={member.photo}
                link={member.link}
                linkToCources={member.linkToCources} />)}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="about-us-wrapper">
      <div className="about-content">
        <div className="about-us-team">
          <div className="about-team-tabs">
            {ourTeamTabs(ourTeamTabsNames)}
          </div>
          {tabContent()}
        </div>
        <div className="about-us-block">
          <div className="about-us-illustration"><img src={imageLogo} /></div>
          <div className="about-us-text">
            <div className="about-us-title">
              {<FormattedMessage id="app.about.whatIsTheLessoner" />}
            </div>
            <span>{<FormattedMessage id="app.aboutDescription" />}</span>
          </div>
        </div>
        <div className="about-us-details">
          <div className="about-us-details-tile about-who-are-we">
            <img src={logo} />
            <div>
              <div className="about-us-details-title">
                {<FormattedMessage id="app.about.whoAreWe" />}
              </div>
              <span>{<FormattedMessage id="app.about.whoAreWeDescription" />}</span>
            </div>
          </div>
          <div className="about-us-details-tile about-our-mission">
            <img src={rocket} />
            <div>
              <div className="about-us-details-title">
                {<FormattedMessage id="app.about.OurMission" />}
              </div>
              <span>{<FormattedMessage id="app.about.OurMissionDescription" />}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="about-contact-information">
        <a href="tel:+ 375 33 900-44-44">+ 375 33 900-44-44</a>
        <div className="about-contact-icons">
          <a href="https://www.grodno.it-academy.by/"><Network /></a>
          <a href="https://www.instagram.com/grodnoitacademypark/"><Instagram /></a>
          <a href="https://www.facebook.com/grodnoitacademypark"><Facebook /></a>
          <a href="https://www.linkedin.com/school/15248534/"><Linkedin /></a>
        </div>
        <div>{<FormattedMessage id="app.about.rights" />}</div>
      </div>
    </div>
  );
};
