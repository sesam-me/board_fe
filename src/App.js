import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    getData();
  }, []);

  function getData ()  {
    axios.get("http://localhost:8080/api/v1/member")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        }).catch((err) => {
            console.log(err)
        })
  }



  const nameHandler = (e) => {
    setName(e.target.value);
  }
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  }

  const submitHandler = (e) => {
    axios.post("http://localhost:8080/api/v1/member", {
      name : name,
      description  : description,
    })
        .then((response)=> {
          alert("제출완료");
          console.log(response);
        })
        .catch((err) => console.log(err))
  }

  const deleteHandler = (name) => {
    axios.delete(`http://localhost:8080/api/v1/member/${name}`)
        .then((response) => {
          alert("삭제완료")
        })
        .catch((err) => console.log(err))
  }

  const updateHandler = (data) => {
      axios.put(`http://localhost:8080/api/v1/member/${name}`, {
          name : name,
          description : description
      })
          .then((response) => {
              alert("수정완료")
              console.log(response);
          })
          .catch((err) => console.log(err))
  }






  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

          <div>
            <input placeholder={"이름"} onChange={nameHandler}/>
            <input placeholder={"내용"} onChange={descriptionHandler}/>
          </div>
          <button onClick={submitHandler}>제출하기</button>

          <div>

              {data.length != 0 && data.map((item,idx) => (
                  <div key={idx}>
                      <div>
                          <p>{item.name}</p>
                          <p>{item.description}</p>
                      </div>
                      <button onClick={() => {deleteHandler(item.name)}}>삭제</button>
                      <button onClick={() => {updateHandler(item.name)}}>수정</button>

                  </div>
              ))}


          </div>


      </header>
    </div>
  );
}

export default App;
