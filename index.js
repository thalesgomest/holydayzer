import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" },
];

app.get("/holidays", (req, res) => {
    let aux = "";

    holidays.map((holiday) => {
        aux = aux + `<p>${holiday.date} - ${holiday.name}</p>`;
    });
    res.send(aux);
});

app.get("/is-today-holiday", (req, res) => {
    const date = new Date();
    const today = date.toLocaleDateString("en-US");

    const todayHolidayArr = holidays.filter((holiday) => {
        return holiday.date === today;
    });

    if (todayHolidayArr.length === 0) {
        res.send(`Hoje não é feriado!`);
    } else {
        res.send(`Hoje é feriado! ${todayHolidayArr[0].name}`);
    }
});

app.get("/holidays/:idMonth", (req, res) => {
    const idMonth = req.params.idMonth;

    const holidaysMonth = holidays.filter((holiday) => {
        return holiday.date.split("/")[0] === idMonth;
    });

    let aux = "";
    holidaysMonth.map((holidayMonth) => {
        aux = aux + `<p>${holidayMonth.date} - ${holidayMonth.name}</p>`;
    });

    if (holidaysMonth.length === 0) {
        res.send(`Não há feriados neste mês!`);
    } else {
        res.send(aux);
    }
});

app.listen(4000);
