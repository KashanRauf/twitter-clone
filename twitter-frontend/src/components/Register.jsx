import { parseDate, today } from "@internationalized/date";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Popover } from 'react-aria-components';
import { IoIosInformationCircle, IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { LuRabbit } from "react-icons/lu";
import AuthContext from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { authReq, setAuthToken } from "../common/Request";

// Regular expressions for form verification
// TODO Secure against SQL injection and whatnot (if necessary)
const handle_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;                           // 4-16 chars, must start with a letter
const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%()]).{8,24}$/;  // 8-24 chars, has a lowercase char, uppercase char, digit, and special char
const display_regex = /^.{1,32}$/;                                              // Upto 32 characters, no restriction

const Register = ({ show, onClose, setIsAuthenticated }) => {
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    
    // Fields for form: Handle, password, display name (optional), birth date (must be older than 13)
    const [handle, setHandle] = useState("");
    const [validHandle, setValidHandle] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatchPwd, setValidMatchPwd] = useState(false);

    const [display, setDisplay] = useState("");
    const [validDisplay, setValidDisplay] = useState(false);

    const [bdate, setBDate] = useState(parseDate("2025-05-11"));
    const [validBDate, setValidBDate] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    // Hooks check that the given information is valid
    useEffect(() => {
        const res = handle_regex.test(handle);
        setValidHandle(res);

        // console.log(res);
        // console.log(handle);
    }, [handle]);

    useEffect(() => {
        const res = display_regex.test(display);
        setValidDisplay(res || display.length == 0);

        // console.log(res);
        // console.log(display);
    }, [display]);

    useEffect(() => {
        const res = pwd_regex.test(pwd);
        setValidPwd(res);

        // console.log(res);
        // console.log(pwd + ", " + matchPwd);
    }, [pwd]);

    useEffect(() => {
        const res = pwd === matchPwd;
        setValidMatchPwd(res);
    }, [pwd, matchPwd]);

    useEffect(() => {
        // Users must be at least 13 -> Add 13 years to "given" and compare
        try {
            var given = bdate.toString().split("-");
            given[0] = (parseInt(given[0]) + 13).toString();
            given = parseDate(given[0] + "-" + given[1] + "-" + given[2]);
            const cur = today("EST");

            const res = given.compare(cur) <= 0;

            setValidBDate(res);
        
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            // The only error is a formatting issue when entering date by text
            console.warn("There may be sm amiss with the date field but surely not right?");
            // console.error(error);
        }
    }, [bdate]);

    // Based on what fields are valid, sets an appropriate error message.
    useEffect(() => {
        if (!validHandle) {
            setErrMsg("Handle must be between 4-16 characters in length. May only use alphanumeric characters, underscore (_), or period (.), must start with an a letter.");
        } else if (!validPwd) {
            setErrMsg("Password must be between 8-24 characters in length. Must inlcude at least one uppercase letter, lowercase letter, digit, and special character.");
        } else if (!validMatchPwd) {
            setErrMsg("Passwords do not match.");
        } else if (!validDisplay) {
            setErrMsg("Display name may not exceed 32 characters in length.")
        } else if (!validBDate) {
            setErrMsg("Must be at least 13 years of age")
        } else {
            setErrMsg("");
        }
    }, [validHandle, validPwd, validMatchPwd, validDisplay, validBDate]);

    // Checks that all fields are valid.
    const submitReady = () => {
        return validHandle && validPwd && validMatchPwd && validBDate && validDisplay;
    }

    // Sends data to backend to attempt registration
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!submitReady()) {
            return;
        }

        const submitTime = parseDate(new Date(Date.now()).toISOString().substring(0, 10));
        // console.log(submitTime.toString());
        
        const data = {
            "handle": handle,
            "displayName": display,
            "password": pwd,
            "role": "USER",
            "creationDateTime": submitTime.toString(),
            "birthDate": bdate.toString(),
            "tweets": [],
            "following": [],
            "blocked": [],
            "likes": [],
            "bookmarks": [],
            "followers": []
        };
        // console.log(data);

        await authReq
            .post("register", data)
            .then((response) => {
                // Adds token to authentication context and triggers redirect
                console.log(response);
                const token = response?.data?.token;
                const decoded = jwtDecode(token);
                const handle = decoded.sub;
                const display = decoded.display;
                const bdate = decoded.birthDate;
                
                setAuth({ token, handle, display, bdate });
                setAuthToken(token);
                setIsAuthenticated(true);
            }).catch((error) => {
                console.error(error);
                if (!error?.response) {
                    setErrMsg("No response.");
                } else if (error.response?.status === 400) {
                    setErrMsg("Bad request.");
                } else if (error.response?.status === 401) {
                    setErrMsg("Unauthorized.");
                } else {
                    setErrMsg("Failed to register.")
                }
            });

        // await axios
        //     .post("http://127.0.0.1:8080/api/auth/register", data)
        }

    if (!show) return null;

    return (
        <section className="lr-modal">
            <IconContext.Provider value={{ size: 24 }}>
                <IoMdClose onClick={onClose} className="modal-close" />
            </IconContext.Provider>
            <IconContext.Provider value={{ size: 36 }}>
                <LuRabbit className="lr-modal-icon" />
            </IconContext.Provider>

            <h2>Register</h2>
            <form className="register-form">
                <div className="register-form-pair">
                    <label htmlFor="handle">Handle</label>
                    <input id="handle" name="handle" type="text" ref={userRef} autoComplete="off"
                        required value={handle} onChange={(e) => { setHandle(e.target.value) }} />
                </div>
                <div className="register-form-pair">
                    <label htmlFor="display">Display name (optional)</label>
                    <input id="display" name="display" type="text" autoComplete="off"
                        value={display} onChange={(e) => { setDisplay(e.target.value) }} />
                </div>
                <div className="register-form-pair">
                    <label htmlFor="pwd">Password</label>
                    <input id="pwd" name="pwd" type="password"
                        required value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
                </div>
                <div className="register-form-pair">
                    <label htmlFor="confirm">Confirm password</label>
                    <input id="confirm" name="confirm" type="password"
                        required value={matchPwd} onChange={(e) => { setMatchPwd(e.target.value) }} />
                </div>
                <div className="register-form-pair">
                    <label htmlFor="bdate">Date of birth</label>
                    <DatePicker aria-label="Date of birth" value={bdate}
                        onChange={setBDate} isRequired maxValue={today("EST")}>
                        <Group>
                            <DateInput >
                                {(segment) => <DateSegment segment={segment} />}
                            </DateInput>
                            <Button>▼</Button>
                        </Group>
                        <Popover>
                            <Dialog>
                                <Calendar>
                                    <header>
                                        <Button slot="previous">◀</Button>
                                        <Heading />
                                        <Button slot="next">▶</Button>
                                    </header>
                                    <CalendarGrid>
                                        {(date) => <CalendarCell date={date} />}
                                    </CalendarGrid>
                                </Calendar>
                            </Dialog>
                        </Popover>
                    </DatePicker>
                </div>

                <div className="err-msg">
                    <IoIosInformationCircle className={errMsg.length <= 0 ? "hidden" : undefined}/>
                    <p>{errMsg}</p>
                </div>

                <button type="button" className="lr-button"
                    onClick={handleRegister}>Register</button>
            </form>
        </section>
    );
}

export default Register;