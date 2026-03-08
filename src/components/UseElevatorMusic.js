import useSound from 'use-sound';
import elevmusic from "../assets/music/elevator-music/elev-music-1.mp3";

// Functional component using use-sound
const SoundButton = ({ onPlay }) => {
  const [play] = useSound(elevmusic, { volume: 0.5 });

  const handleClick = () => {
    play();
    if (onPlay) onPlay();
  };

  return <button onClick={handleClick}>Play Sound</button>;
};


// Class component using the functional wrapper
class UseElevatorMusic extends React.Component {
  handleSoundPlay = () => {
    console.log('Sound played!');
  };

  render() {
    return (
      <div>
        <h1>Using use-sound in Class Component</h1>
        <SoundButton onPlay={this.handleSoundPlay} />
      </div>
    );
  }
}

export default UseElevatorMusic; 