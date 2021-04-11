export const verTareas = (alumno) => async (dispatch) => {
  let tareas=[];
  if(alumno.codigoweb!==undefined){
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/cargarTareas';
    let data = {
      codigoweb:alumno.codigoweb,
      grado:alumno.grado,
    };
    let respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'default',
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    }).catch(error => {
        console.log(error);
    });
    tareas = await respuesta.json();
  }else{
    tareas=[]
  }
  dispatch({
    type: 'ver_tareas',
    payload: tareas
  });
}

export const verCredenciales =  (codigoweb) => async (dispatch) => {
  const url = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/creds';
  let respuesta = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers:{
          'Content-Type': 'application/json'
      },
      Accept: 'application/json',
  }).catch(error => {
      console.log(error);
  });
  let result = await respuesta.json();
  dispatch({
      type: 'ver_credenciales',
      payload: result
  });
}


export const setAlumno = (alumno) => (dispatch) => {
  dispatch({
    type: 'set_alumno',
    payload: alumno
  })
}

export const getAlumno = () => (dispatch) => {
  dispatch({
    type: 'get_alumno',
  })
}

export const setFoto = (foto) => (dispatch) => {
  dispatch({
    type: 'set_foto',
    payload: foto
  })
}

export const setDatos = (datos) => (dispatch) => {
  dispatch({
    type: 'set_datos',
    payload: datos
  })
}





