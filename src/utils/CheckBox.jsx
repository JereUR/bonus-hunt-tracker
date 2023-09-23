import styled, { keyframes } from 'styled-components'

export default function CheckBox({
  checked,
  setChecked = null,
  functionClick = null
}) {
  return (
    <CheckBoxStyled>
      <label className="container">
        <input
          type="checkbox"
          defaultChecked={checked}
          onClick={functionClick ? functionClick : () => setChecked(!checked)}
        />
        <div className="checkmark"></div>
        <svg
          width="50"
          height="50"
          xmlns="http://www.w3.org/2000/svg"
          className="celebrate"
        >
          <polygon points="0,0 10,10"></polygon>
          <polygon points="0,25 10,25"></polygon>
          <polygon points="0,50 10,40"></polygon>
          <polygon points="50,0 40,10"></polygon>
          <polygon points="50,25 40,25"></polygon>
          <polygon points="50,50 40,40"></polygon>
        </svg>
      </label>
    </CheckBoxStyled>
  )
}

const kfrCelebrate = keyframes`0% {
      transform: scale(0);
    }

    50% {
      opacity: 1;
    }

    100% {
      transform: scale(1.2);
      opacity: 0;
      display: none;
    }`

const CheckBoxStyled = styled.div`
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    border-radius: 50%;
    background-color: white;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: relative;
    top: 0;
    left: 0;
    height: 1.3em;
    width: 1.3em;
    transition: 0.3s;
    transform: scale(0);
    border-radius: 50%;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #20c580;
    transform: scale(1);
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container input:checked ~ .celebrate {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 0.45em;
    top: 0.25em;
    width: 0.3em;
    height: 0.5em;
    border: solid white;
    border-width: 0 0.15em 0.15em 0;
    transform: rotate(45deg);
  }

  .container .celebrate {
    position: absolute;
    transform-origin: center;
    animation: ${kfrCelebrate} 0.4s;
    animation-fill-mode: forwards;
    display: none;
    stroke: #20c580;
  }
`
