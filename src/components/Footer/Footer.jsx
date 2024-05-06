import styled from 'styled-components'

import githubLogo from '../../assets/github-logo.png'
import linkedinLogo from '../../assets/linkedin.png'
import portfolioLogo from '../../assets/portfolio-logo.png'
import supabaseImg from '../../assets/supabase-dark.svg'
import reactImg from '../../assets/react.png'

export default function Footer() {
  return (
    <FooterStyled>
      <div className="social-container">
        <div>
          <a
            href="https://github.com/JereUR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="github" />
          </a>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/jeremias-dominguez-vega/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinLogo} alt="linkedin" />
          </a>
        </div>
        <div>
          <a
            href="https://jeremiasdvportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={portfolioLogo}
              alt="portfolio"
              className="portfolio-img"
              title="Personal Portfolio"
            />
          </a>
        </div>
      </div>
      <div className="created-by-container">
        <p>© {new Date().getFullYear()} Created by Jeremías Domínguez Vega.</p>
      </div>
      <div className="powered-by">
        <span>Powered By</span>
        <div className="img-container">
          <img
            className="supabase-img"
            src={supabaseImg}
            alt="supase"
            title="Supabase"
          />
          <p>&</p>
          <img
            className="react-img"
            src={reactImg}
            alt="react"
            title="React.JS"
          />
        </div>
      </div>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-between;
  background-color: var(--background-home-color);
  padding: 30px 20px 10px 20px;

  .social-container {
    display: flex;

    img {
      margin: 0 10px;
      border-radius: 50%;
      width: 40px;
      opacity: 0.6;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: scale(1.09);
        opacity: 1;
      }
    }

    .portfolio-img {
      width: 44px;
    }
  }

  .created-by-container {
    font-size: 14px;
  }

  .powered-by {
    span {
      font-size: 14px;
    }

    .img-container {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      p {
        font-size: 12px;
      }

      img {
        width: 90px;
      }
    }
  }

  //Responsive Design

  @media screen and (max-width: 480px) {
    display: block;

    .social-container {
      justify-content: center;
      margin-bottom: 20px;
    }

    .created-by-container {
      margin-bottom: 20px;
    }

    .img-container {
      justify-content: center;
    }
  }
`
