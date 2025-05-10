import React, { useRef, useState, useEffect } from "react";
import { LuRabbit } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const handle_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,16}$/;                          // 3-16 chars, must start with a letter
const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;   // 8-24 chars, has a lowercase char, uppercase char, digit, and special char
const display_regex = /^.*$/;

const Register = ({ show, onClose }) => {

    // Fields for form: Handle, password, display name (optional), birth date (must be older than 13)
    const userRef = useRef();
    const errRef = useRef();

    const [handle, setHandle] = useState("");
    const [validHandle, setValidHandle] = useState(false);
    const [handleFocus, setHandleFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [display, setDisplay] = useState("");
    const [validDisplay, setValidDisplay] = useState(false);
    const [displayFocus, setDisplayFocus] = useState(false);

    const [bdate, setBDate] = useState(new Date());
    const [validBDate, setValidBDate] = useState(false);
    const [bdateFocus, setBDateFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const res = handle_regex.test(handle);
        setValidHandle(res);

        // console.log(res);
        // console.log(handle);
    }, [handle]);

    useEffect(() => {
        const res = pwd_regex.test(pwd);
        setValidPwd(res);

        const match = res && pwd === matchPwd;
        setValidMatchPwd(match);

        // console.log(res);
        // console.log(pwd + ", " + matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        const res = display_regex.test(display);
        setValidDisplay(res);

        // console.log(res);
        // console.log(display);
    }, [display]);

    useEffect(() => {
        setErrMsg("");
    }, [handle, pwd, matchPwd, display]);

    // May need more hooks for other fields e.g. birth date

    if (!show) return null;

    return (
        <section className="lr-modal">
            <IconContext.Provider value={{size:24}}>
                <IoMdClose onClick={onClose} className="modal-close" />
            </IconContext.Provider>
            <IconContext.Provider value={{size:36}}>
                <LuRabbit className="lr-modal-icon"/>
            </IconContext.Provider>

            <h2>Register</h2>
            <form className="lr-form" onSubmit={() => {/* register function */ }}>
                <div className="lr-form-pair">
                    <label htmlFor="handle">Handle</label>
                    <input id="handle" name="handle" type="text"
                        value={handle} onChange={(e) => {setHandle(e.target.value)}} />
                </div>
                <div className="lr-form-pair">
                    <label htmlFor="display">Display name</label>
                    <input id="display" name="display" type="text"
                        value={display} onChange={(e) => {setDisplay(e.target.value)}} />
                </div>
                <div className="lr-form-pair">
                    <label htmlFor="pwd">Password</label>
                    <input id="pwd" name="pwd" type="password"
                        value={pwd} onChange={(e) => {setPwd(e.target.value)}} />
                </div>
                <div className="lr-form-pair">
                    <label htmlFor="confirm">Confirm password</label>
                    <input id="confirm" name="confirm" type="password"
                        value={matchPwd} onChange={(e) => {setMatchPwd(e.target.value)}} />
                </div>
                <div className="lr-form-pair">
                    <label htmlFor="bdate">Date of birth</label>
                    <DatePicker id="bdate" name="bdate" label="Date of birth" 
                        selected={bdate} value={bdate} onChange={(e) => {setBDate(e)}} />
                </div>
            </form>
        </section>
    );
}

export default Register;