import Logo3dStories from '../Svg/Logo3dStories'
import './Team.css'

const Team = ({ name, role, uni, link }) => {
  return (
    <div className="Team">
      <a href={link} target="_blank" rel="noreferrer">
        <Logo3dStories width={80} className={'my-10 opacity-50'} />
        <h3 className="mt-2">{name}</h3>
        <p className="mb-2 mt-[0!important]">{role}</p>
        <span>{uni}</span>
      </a>
    </div>
  )
}

export default Team