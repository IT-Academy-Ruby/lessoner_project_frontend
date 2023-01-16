import "./about.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { THEME, useTheme } from "../../../../utils/useTheme";
import Button from "../../../Button";
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
import team from "../../../../assets/team.png";
import { teamMembers } from "../../../../teamMembers";
import { useState } from "react";

const About = () => {
  const theme = useTheme();
  const imageLogo = theme === THEME.DARK ? aboutUsDark : aboutUsLight;
  const imageStars = theme === THEME.DARK ? starsDark : starsLight;
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState(intl.formatMessage({ id: "app.about.tab.team" }));

  const ourTeamTabsNames = [
    intl.formatMessage({ id: "app.about.tab.team" }),
    intl.formatMessage({ id: "app.about.tab.founders" }),
    intl.formatMessage({ id: "app.about.tab.projectManagement" }),
    intl.formatMessage({ id: "app.about.tab.businessAnalysis" }),
    intl.formatMessage({ id: "app.about.tab.design" }),
    intl.formatMessage({ id: "app.about.tab.backend" }),
    intl.formatMessage({ id: "app.about.tab.frontend" }),
    intl.formatMessage({ id: "app.about.tab.qa" }),
  ];

  const getTeamByRole = (role: string) => {
    switch (role) {
    case intl.formatMessage({ id: "app.about.tab.founders" }):
      return (
        teamMembers.filter(member => member.role.includes("IT-Academy") || 
          member.role.includes("PO"))
      );
    case intl.formatMessage({ id: "app.about.tab.projectManagement" }):
      return (
        teamMembers.filter(member => member.role.includes("Project"))
      );
    case intl.formatMessage({ id: "app.about.tab.businessAnalysis" }):
      return (
        teamMembers.filter(member => member.role.includes("Business"))
      );
    case intl.formatMessage({ id: "app.about.tab.design" }):
      return (
        teamMembers.filter(member => member.role.includes("Designer") ||
          member.role.includes("UX/UI designer"))
      );
    case intl.formatMessage({ id: "app.about.tab.backend" }):
      return (
        teamMembers.filter(member => member.role.includes("Backend") ||
          member.secondRole && member.secondRole.includes("Backend"))
      );
    case intl.formatMessage({ id: "app.about.tab.frontend" }):
      return (
        teamMembers.filter(member => member.role.includes("Frontend") ||
          member.secondRole && member.secondRole.includes("Frontend"))
      );
    case intl.formatMessage({ id: "app.about.tab.qa" }):
      return (
        teamMembers.filter(member => member.role.includes("QA"))
      );
    default:
      return [];
    }
  };

  const ourTeamTabs = (tabs: Array<string>) => {
    return tabs.map(tab => {
      return (
        <div key={tab}>
          <Button
            buttonType="button"
            buttonText={tab}
            onClick={() => setActiveTab(tab)}
            className={classNames("button-about-team", 
              { "button-about-team-active": activeTab === tab })}
            name={tab}
          />
        </div>
      );
    });
  };

  const tabContent = () => {
    if (activeTab === intl.formatMessage({ id: "app.about.tab.team" })) {
      return (
        <div className="about-team-content">
          <div>
            <div className="about-our-team-header">
              {<FormattedMessage id="app.about.ourTeam" />}
              <img src={imageStars} />
            </div>
            {<FormattedMessage id="app.about.ourTeamDescription" />}
          </div>
          <img src={team} alt="our team" />
        </div>
      );
    } else {
      return (
        <div className="about-team-roles">
          <div className="about-team-role-title">{activeTab}</div>
          <div className="about-team-cards">
            {getTeamByRole(activeTab).map(member => 
              <TeamMemberCard key={member.id} 
                name={member.name} 
                city={member.city} 
                secondRole={member.secondRole} 
                role={member.role} 
                photo={member.photo} 
                link={member.link} />)}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="about-us-wrapper">
      <div className="about-us-block">
        <div className="about-us-text">
          <div className="about-us-title">
            {<FormattedMessage id="app.about" />}
          </div>
          <span>{<FormattedMessage id="app.aboutDescription" />}</span>
        </div>
        <div className="about-us-illustration"><img src={imageLogo} /></div>
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
      <div className="about-us-team">
        <div className="about-team-tabs">
          {ourTeamTabs(ourTeamTabsNames)}
        </div>
        {tabContent()}
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
export default About;
