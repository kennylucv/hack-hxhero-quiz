import React, { useEffect, useState } from "react";

import { Page } from "../genericsStyled";
import { Archetype, IPieData, IQuizData, IScore } from "../../interfaces/quiz";
import getPieData from "../../api/getPieData";

import { Chart, Legend, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { FormControl, InputLabel, Paper, Select } from "@material-ui/core";
import getAnswerPercent, { IAnswerData, IGetAnswerPercentResults } from "../../api/getAnswerPercent";

const strings = {
  headerText: "What Kind of Home Hero Are You?",
  bodyText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  ctaText: "Start Quiz",
};

const pollDelay = 5000;

interface IChartData {
  archetype: string;
  count: number;
}

interface IDashboardProps {
  quizData: IQuizData;
}

const Dashboard = (props: IDashboardProps): JSX.Element => {
  const archetypes = Object.values(Archetype);
  const questions = props.quizData.questions;
  const [pieData, setPieData] = useState<IPieData | undefined>();
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('diyer');
  const [answerData, setAnswerData] = useState<IAnswerData[]>([]);


  const transformData = (data: IPieData) => {
    const dataKeys = Object.keys(data);
    const chartData = dataKeys.map((key) => ({ archetype: key, count: (data as any)[key] as number}));
    return chartData;
  }

  const transformPercentData = (data: IGetAnswerPercentResults) => {
    const { results } = data;
    return Object.values(data.results);
  }

  const fetchPieData = async() => {
    getPieData().then((data) => {
      if (data) {
        const chartData = transformData(data.pieData);
        setChartData(chartData);
        setPieData(data.pieData);
      }
    });
  }

  console.log("chart data", chartData)

  useEffect(() => {
    let interval = setInterval(() => fetchPieData(), (pollDelay))

    if (!!selectedQuestionId) {
      getAnswerPercent(selectedQuestionId, selectedArchetype).then((data) => {
        if (data) {
          const ansData = transformPercentData(data);
          setAnswerData(ansData);
        }
      });
    }

    //destroy interval on unmount
    return () => clearInterval(interval)
  }, [selectedQuestionId, selectedArchetype]);

  
  return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="count"
            argumentField="archetype"
          />
          <Legend />
          <Title text="Archetypes" />
        </Chart>

        <div>
          <InputLabel htmlFor="age-native-simple">Question</InputLabel>
          <Select
            native
            value={selectedQuestionId}
            onChange={(e) => setSelectedQuestionId(e.target.value as string)}
          >
            <option aria-label="None" value="" />
            {questions.map((question) => (
              <option value={question.id}>{question.question}</option>
            ))}
          </Select>

          <InputLabel htmlFor="age-native-simple">Archetype</InputLabel>
          <Select
            native
            value={selectedArchetype}
            onChange={(e) => setSelectedArchetype(e.target.value as string)}
          >
            {archetypes.map((archetype) => (
              <option value={archetype}>{archetype.toUpperCase()}</option>
            ))}
          </Select>

          {answerData.length > 0 && (
            <Chart
              data={answerData}
            >
              <PieSeries
                valueField="count"
                argumentField="answer"
              />
              <Legend />
              <Title text="Answer Metrics" />
            </Chart>
          )}

        </div>
      </Paper>
  );
};

export default Dashboard;
