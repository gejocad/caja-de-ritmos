import  React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const drums = [
  {
    clave: 'Q',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    clave: 'W',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    clave: 'E',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    clave: 'A',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    clave: 'S',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    clave: 'D',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    clave: 'Z',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    clave: 'X',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    clave: 'C',
    sonido: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

const App = () => (
  <div id="teclado" className="teclado">
    <h1>Caja de sonidos</h1>
    {drums.map((sonido, idx) => (
      <Tambor text={sonido.clave} clave={idx} audio={sonido.sonido} />
    ))}
  </div>
);

class Tambor extends React.Component {
  constructor(props) {
    super(props);
    
    this.audio = React.createRef();
  }
  
  componentDidMount() {
    this.audio.current.addEventListener('ended', (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove('active');
    });
  }
  
  playsonido = () => {
    this.audio.current.play();
    
    const id = this.audio.current.id;
    
    const parent = this.audio.current.parentNode;
    parent.classList.add('active');
    
    const teclado = parent.parentNode;
    teclado.querySelector('h1').innerText = `${id} esta siendo clickeado`;
  }
  
  render() {
    const { text, audio } = this.props;
    
    return (
      <div className="tecla" onClick={this.playsonido} id={`drum-${text}`}>
        {text}
        <audio ref={this.audio} src={audio} className="clip" id={text} />
      </div>
    )
  }
}
    
document.addEventListener('keydown', (e) => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);
  
  if(audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add('active');
    
    const teclado = parent.parentNode;
    teclado.querySelector('h1').innerText = `${id} esta siendo tecleado`;
    audio.play();
  }
});


export default App;