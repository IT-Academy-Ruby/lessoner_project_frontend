import "./teamMemberCard.scss";
import Button from "../../../Button";
import { ReactComponent as Geo } from "../../../icons/geo.svg";
import { ReactComponent as Linkedin } from "../../../icons/navbar/linkedin.svg";
import classNames from "classnames";
import { useIntl } from "react-intl";

export type personalData = {
  name?: string,
  city: string,
  role: string,
  secondRole?: string,
  photo: string,
  link: string,
  linkToCources?: string
}

const TeamMemberCard = ({
  name, city, role, photo, link, secondRole, linkToCources
}: personalData) => {
  const intl = useIntl();
  const isMentor = role.includes("mentor") || (secondRole && secondRole.includes("mentor"));
  const isTeamLead = role.includes("Team Lead");
  const isITAcademy = role.includes("IT-Academy");

  return (
    <div
      className={classNames("team-member-card-wrapper", 
        { "team-mentor": isMentor })}
    >
      <div className="team-member-card-photo">
        <div>
          <a href={link} target="_blank" rel="noreferrer">
            <Linkedin />
          </a>
          <img src={photo} />
        </div>
      </div>
      <div className="team-member-card-city">
        <Geo />
        {city}
      </div>
      <div className="team-member-card-info">
        <div className="team-member-name">{name}</div>
        <div
          className={classNames(
            { "team-mentor-lead-doubled-roles": isMentor },
            { "team-mentor-lead-doubled-roles": isTeamLead },
            { "team-it-academy-roles": isITAcademy }
          )}
        >
          <span
            className={classNames(
              { "team-mentor-lead-role": role.includes("mentor") },
              { "team-mentor-lead-role": isTeamLead },
              { "team-it-academy-role": isITAcademy }
            )}
          >
            {role}
          </span>
          {secondRole && (
            <span className={classNames({ "team-mentor-lead-role": isMentor })}>
              {secondRole}
            </span>
          )}
        </div>
      </div>
      {isMentor && (
        <a
          href={
            linkToCources ? linkToCources : "https://www.grodno.it-academy.by/"
          }
        >
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.about.button.signUpForCources"})}
            className="button-about-cources"
          />
        </a>
      )}
    </div>
  );
};
export { TeamMemberCard };
