import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBoundary/ErrorBaundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);
  const onCharSelected = (id) => setChar(id);

  return (
    <>
      <RandomChar/>
      <div className="char__content">
          <CharList onCharSelected={onCharSelected}/>
          <ErrorBaundary>
              <CharInfo charId={selectedChar}/>
          </ErrorBaundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;