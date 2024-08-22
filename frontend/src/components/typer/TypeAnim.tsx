import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import GraphemeSplitter from 'grapheme-splitter'; // npm i grapheme-splitter




const TypingAnim = () => {
    const splitter = new GraphemeSplitter();
    return (
        <TypeAnimation
        splitter={(str) => splitter.splitGraphemes(str)}
        sequence={[
          'Chat With Your Own AI',
          1000,
          'Built with OpenAI 🤖',
          1000,
          'Your Own Customized ChatGPT 💻',
          1000,
        ]}
        speed={50}
        style={{ 
            fontSize: '60px',
            color:"black",
            display:"inline-block",
            textShadow:"1px 1px 20xp #fff",
        }}
        repeat={Infinity}
      />
    )
}

export default TypingAnim;