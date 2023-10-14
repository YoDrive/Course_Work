import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


export function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <form>
            <input onChange={e => setEmail(e.target.value)} type="email" value={email}/>
            <input onChange={e => setPassword(e.target.value)} type="password" value={password}/>
            <button onClick={(e) => {e.preventDefault(); store.login(email, password)}}>Логин</button>
        </form>
    );

    // return (
    //     <div className={styles.container}>
    //         <div className={styles.authBox}>
    //             <h1 className={styles.title}>Авторизация</h1>
    //             <Form className={styles.inputContainer}>
    //                 <Form.Group className={styles.form} controlId="formBasicEmail">
    //                     <Form.Label className={styles.inputText} onChange={handleInputChange}>Email</Form.Label>
    //                     <Form.Control
    //                         className={styles.inputForm}
    //                         type="email"
    //                         name="email"
    //                         value={user.email}
    //                         onChange={handleInputChange}
    //                     />
    //                 </Form.Group>
    //                 <Form.Group className={styles.form} controlId="formBasicPassword">
    //                     <Form.Label className={styles.inputText} onChange={handleInputChange}>Пароль</Form.Label>
    //                     <Form.Control
    //                         className={styles.inputForm}
    //                         type="password"
    //                         name="password"
    //                         value={user.password}
    //                         onChange={handleInputChange}
    //                     />
    //                 </Form.Group>
    //                 <div className={styles.buttons}>
    //                      <Button className={styles.registerBtn} variant="dark">Регистрация</Button>
    //                      <Button className={styles.enterBtn} onClick={handAuthorization} variant="dark">Вход</Button>
    //                 </div>
    //             </Form>
    //         </div>
    //     </div>
    // )
}

export default observer(LoginPage);