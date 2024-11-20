import Transition from '../Ui/Transition'
import IntroContent from '../Data/introduction.json'
import Button from '../Ui/Button'
import { Link } from 'react-router-dom'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
import Team from '../Ui/Team'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const IntroPage = () => {
  return (
    <div className="IntroPage">
      <div className="overflow-hidden absolute w-full h-screen flex items-end pointer-events-none">
        <ScrollDownIndicator className={'mb-10 absolute'}></ScrollDownIndicator>
      </div>

      <main className="flex w-full overflow-hidden flex-col justify-center items-center p-4">
        <HelmetProvider>
          <Helmet>
            <title>3D Stories</title>
            <meta name="description" content="" data-rh="true" />
            <meta name="keywords" content="UCLAB, C²DH" />
          </Helmet>
        </HelmetProvider>
        <div className="h-screen flex items-center sm:translate-x-[0rem] xl:translate-x-[-12rem]">
          {IntroContent?.sections?.map((d, i) =>
            i === 0 ? (
              <div key={d.path ?? i} className="intro relative">
                <h1 dangerouslySetInnerHTML={{ __html: d.title }} />{' '}
                <Link to="/robe">
                  <Button
                    className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
                    value="EXPLORE STORIES"
                  />
                </Link>
              </div>
            ) : null
          )}
        </div>
        {IntroContent?.sections
          .filter((_, i) => i >= 1)
          .map((d, i, arr) => (
            <section
              key={d.path ?? i}
              className="flex relative flex-col with-background w-screen justify-center items-center"
            >
              {console.debug('PATH', arr)}
              <div
                className={`max-w-[800px] p-6 md:p-10 ${i === 0 ? 'mt-[10vh]' : ''} justify-start ${i === 5 ? 'hidden' : 'block'} ${i === 4 ? 'mb-[10vh]' : ''}`}
              >
                <h2 className="mb-[1rem] self-start">{d.title === 'Team' ? null : d.title}</h2>
                <p className="intro-content flex-grow" dangerouslySetInnerHTML={{ __html: d.description }}></p>
              </div>
            </section>
          ))}
        <h2 className="mb-[1rem] mt-[10rem] relative">Team</h2>
        {IntroContent?.sections
          .filter(section => section.team)
          .map((section, i) => (
            <div className="team-block mb-[10rem]" key={i}>
              {section.team.map((member, j) => (
                <div key={j}>
                  <Team
                    key={member.name}
                    name={member.name}
                    img={member.img}
                    role={member.role}
                    uni={member.uni}
                    link={member.link}
                  />
                </div>
              ))}
            </div>
          ))}
        {/* <div className="intiroduction-links relative flex flex-wrap justify-center">
          <a className="mx-3" href="https://uclab.fh-potsdam.de/refa/" target="_blank">
            GitHub-Repro
          </a>
          <a className="mx-3" href="https://uclab.fh-potsdam.de/refa/" target="_blank">
            Restaging Fashion (refa)
          </a>
        </div> */}
      </main>
    </div>
  )
}

export default Transition(IntroPage)
