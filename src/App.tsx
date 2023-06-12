import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";

function App() {
  const [wordCount, setWordCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [isTraduccionChecked, setIsTraduccionChecked] = useState(false);
  const [isCorreccionChecked, setIsCorreccionChecked] = useState(false);
  const [isEditingChecked, setIsEditingChecked] = useState(false);
  const [isEstudianteChecked, setIsEstudianteChecked] = useState(false);
  const [traduccionChoice, setTraduccionChoice] = useState<string>("");
  const [correccionChoice, setCorreccionChoice] = useState<string>("");

  const wordCountLimit = 10000;

  const calculateCost = () => {
    const esEnRate = isEstudianteChecked ? 0.0375 : 0.075;
    const nlEnRate = isEstudianteChecked ? 0.0425 : 0.085;
    const enEsRate = isEstudianteChecked ? 0.0325 : 0.065;
    const nlEsRate = isEstudianteChecked ? 0.04 : 0.08;
    const ortotipoRate = isEstudianteChecked ? 0.03 : 0.06;
    const estiloRate = isEstudianteChecked ? 0.04 : 0.08;
    const ortoTipoEstiloRate = isEstudianteChecked ? 0.05 : 0.095;
    const editingRate = isEstudianteChecked ? 0.06 : 0.095;
    const traduccionCorreccionAndEditingRate = isEstudianteChecked
      ? 0.09
      : 0.13;

    let totalPrice = 0;

    if (isTraduccionChecked && isCorreccionChecked && isEditingChecked) {
      setTotalPrice(wordCount * traduccionCorreccionAndEditingRate);
      return;
    }

    if (isTraduccionChecked) {
      switch (traduccionChoice) {
        case "ESEN":
          totalPrice += wordCount * esEnRate;
          break;
        case "NLEN":
          totalPrice += wordCount * nlEnRate;
          break;
        case "ENES":
          totalPrice += wordCount * enEsRate;
          break;
        case "NLES":
          totalPrice += wordCount * nlEsRate;
          break;
      }
    }

    if (isCorreccionChecked) {
      switch (correccionChoice) {
        case "Ortotipo":
          totalPrice += wordCount * ortotipoRate;
          break;
        case "Estilo":
          totalPrice += wordCount * estiloRate;
          break;
        case "OrtotipoEstilo":
          totalPrice += wordCount * ortoTipoEstiloRate;
          break;
      }
    }

    if (isEditingChecked) {
      totalPrice += wordCount * editingRate;
    }

    setTotalPrice(totalPrice);
  };

  const isButtonDisabled =
    !wordCount ||
    !(isTraduccionChecked || isCorreccionChecked || isEditingChecked) ||
    (isTraduccionChecked && !traduccionChoice) ||
    (isCorreccionChecked && !correccionChoice);

  const renderTraduccionSection = () => {
    if (!isTraduccionChecked) return null;

    return (
      <FormControl sx={{ paddingLeft: "20px" }}>
        <RadioGroup
          name="languageChoice"
          value={traduccionChoice}
          onChange={(event) => {
            setTraduccionChoice(event.target.value);
            setTotalPrice(undefined);
          }}
        >
          <FormControlLabel value="ESEN" control={<Radio />} label="ES - EN" />
          <FormControlLabel value="NLEN" control={<Radio />} label="NL - EN" />
          <FormControlLabel value="ENES" control={<Radio />} label="EN - ES" />
          <FormControlLabel value="NLES" control={<Radio />} label="NL - ES" />
        </RadioGroup>
      </FormControl>
    );
  };

  const renderCorreccionSection = () => {
    if (!isCorreccionChecked) return;

    return (
      <FormControl sx={{ paddingLeft: "20px" }}>
        <RadioGroup
          name="correctionChoice"
          value={correccionChoice}
          onChange={(event) => {
            setCorreccionChoice(event.target.value);
            setTotalPrice(undefined);
          }}
        >
          <FormControlLabel
            value="Ortotipo"
            control={<Radio />}
            label="Ortotipográfica"
          />
          <FormControlLabel value="Estilo" control={<Radio />} label="Estilo" />
          <FormControlLabel
            value="OrtotipoEstilo"
            control={<Radio />}
            label="Ortotipográfica & Estilo"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  const renderTotalPriceSection = () => {
    if (!totalPrice) return null;

    const formatter = new Intl.NumberFormat("EUR", {
      style: "currency",
      currency: "EUR",
    });

    return (
      <Typography>{`Precio total: ${formatter.format(totalPrice)}`}</Typography>
    );
  };

  const handleBlur = () => {
    if (wordCount < 0) {
      setWordCount(0);
    } else if (wordCount > wordCountLimit) {
      setWordCount(wordCountLimit);
    }
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: "#237e98", color: "#e6f5cd" }}
    >
      <header className="App-header">
        <Grid width="500px">
          <Typography variant="h1" fontSize="24px" marginBottom="8px">
            Calculador
          </Typography>
          <form style={{ height: "100%", marginBottom: "16px" }}>
            <Grid>
              <Grid display="flex" width="100%">
                <Grid>
                  <Typography>Número de Palabras</Typography>
                </Grid>
                <Grid width="80%" marginRight="16px">
                  <Slider
                    value={typeof wordCount === "number" ? wordCount : 0}
                    min={0}
                    max={wordCountLimit}
                    onChange={(event, newValue) => {
                      setWordCount(newValue as number);
                      setTotalPrice(undefined);
                    }}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid>
                  <TextField
                    // style={{
                    //   color: "#e6f5cd",
                    // }}
                    sx={{
                      "&.MuiInputBase-root::before": {
                        "border-bottom": "8px solid green",
                      },
                      "&.MuiInput-root::before": {
                        "border-bottom": "8px solid green",
                      },
                    }}
                    variant="standard"
                    value={wordCount}
                    size="small"
                    onChange={(event) => {
                      setWordCount(Number(event.target.value));
                      setTotalPrice(undefined);
                    }}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: wordCountLimit,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Typography minHeight="24px">
                  {wordCount === wordCountLimit &&
                    "Para manuscritos superiores a 10.000 palabras, contáctanos para pedir un presupuesto"}
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isTraduccionChecked}
                      onChange={(event) => {
                        setIsTraduccionChecked(event.target.checked);
                        setTotalPrice(undefined);
                      }}
                    />
                  }
                  label="Traducción"
                />
                {renderTraduccionSection()}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCorreccionChecked}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setIsCorreccionChecked(event.target.checked);
                        setTotalPrice(undefined);
                      }}
                    />
                  }
                  label="Corrección"
                />
                {renderCorreccionSection()}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isEditingChecked}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setIsEditingChecked(event.target.checked);
                        setTotalPrice(undefined);
                      }}
                    />
                  }
                  label="Editing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isEstudianteChecked}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setIsEstudianteChecked(event.target.checked);
                        setTotalPrice(undefined);
                      }}
                    />
                  }
                  label="¿Eres estudiante?"
                />
              </FormGroup>
            </Grid>
          </form>
          <Grid display="flex" alignItems="flex-end">
            <Button
              onClick={calculateCost}
              disabled={isButtonDisabled}
              variant="contained"
              sx={{
                marginRight: "8px",
                color: "white",
              }}
            >
              Calcular
            </Button>
            {renderTotalPriceSection()}
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
