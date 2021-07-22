import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import CountrySelector from "./component/CountrySelector/index";
import Highlight from "./component/Highlight/index";
import Summary from "./component/Summary/index";
import * as api from "./api/index";

function App() {
    const [countries, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [report, setReport] = useState([]);
    const [highlights, setHighlight] = useState([
        {title: "Số ca mắc", number: '__', type: "Confirmed"},
        {title: "Số ca khỏe", number: '__', type: "Recovered"},
        {title: "Số ca tử vong", number: '__', type: "Deaths"}
    ]);
    useEffect(() => {
        api.getCountries().then(res => {
            setCountry(res.data);
            setSelectedCountry('vn');
        });
    }, []);
    const getReport = useCallback(() => {
        let slug = null;
        slug = countries.find(x => x.ISO2.toLowerCase() === selectedCountry);
        if (slug) {
            api.getReportByCountries(slug.Slug).then(res => {
                res.data.pop();
                setReport(res.data);
            });
        }
    }, [selectedCountry]);
    useEffect(() => {
        getReport();
    }, [selectedCountry]);

    useEffect(() => {
        if (report && report[report.length - 1]) {
            setHighlight(highlights.map(x => ({...x, number: (report[report.length - 1])[`${x.type}`]})));
        }
    }, [report]);
    const handleOnChangeCountry = (e) => {
        setSelectedCountry(e.target.value);
    }
    return (
        <div className="root-css">
            <CountrySelector value={selectedCountry} countries={countries}
                             handleOnChangeCountry={handleOnChangeCountry}/>
            <Highlight highlights={highlights} report={report}/>
            <Summary report={report} selectedCountry={selectedCountry}/>
        </div>
    );
}

export default App;
