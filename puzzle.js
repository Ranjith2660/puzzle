import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Get screen width to calculate grid size dynamically
const { width } = Dimensions.get("window");
const boxSize = width / 4 - 20;

// Import images for correct and incorrect selections
import correctImage from '../assets/Checkmark.png';
import wrongImage from '../assets/Wrong.png';

const Puzzle = () => {
  // Predefined correct positions (cells where ✅ should appear)
  const correctPositions = [
    { row: 0, col: 0 },
    { row: 1, col: 3 },
    { row: 2, col: 1 },
    { row: 3, col: 2 },
  ];

  // Top numbers for the grid
  const topNumbers = [17, 24, 5, 12];

  // Labels for left side of the grid
  const leftLabels = ["DD", "MM", "YY", "HH"];

  // State to track clicked cells and their correctness
  const [clickedCells, setClickedCells] = useState([]);

  // Handle cell click event
  const handleCellClick = (row, col) => {
    const isCorrect = correctPositions.some((pos) => pos.row === row && pos.col === col);

    let newClickedCells = [...clickedCells, { row, col, isCorrect }];

    // If correct, mark other cells in the row and column as incorrect
    if (isCorrect) {
      for (let i = 0; i < 4; i++) {
        if (i !== col) newClickedCells.push({ row, col: i, isCorrect: false }); // Mark incorrect in row
        if (i !== row) newClickedCells.push({ row: i, col, isCorrect: false }); // Mark incorrect in column
      }
    } else {
      setTimeout(() => {
        setClickedCells((prevCells) => prevCells.filter((cell) => !(cell.row === row && cell.col === col)));
      }, 500);
    }

    setClickedCells(newClickedCells);
  };

  // Check if a cell is clicked
  const isCellClicked = (row, col) => {
    return clickedCells.some((cell) => cell.row === row && cell.col === col);
  };

  // Get cell style based on correctness
  const getCellStyle = (row, col) => {
    const cell = clickedCells.find((cell) => cell.row === row && cell.col === col);
    if (cell) {
      return cell.isCorrect ? styles.correctCell : styles.wrongCell;
    }
    return styles.cell;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <LinearGradient colors={["#220A46", "#170636", "#03000A"]} style={styles.linearGradient}>

        {/* Title */}
        <Text style={styles.title}>Solve the grid below to find date & time</Text>

        {/* Top Numbers */}
        <View style={styles.topRow}>
          <Text style={styles.topRowPlaceholder}></Text>
          {topNumbers.map((num, index) => (
            <Text key={index} style={styles.topNumber}>{num}</Text>
          ))}
        </View>

        {/* Display grid */}
        <View style={styles.gridContainer}>
          {[0, 1, 2, 3].map((row) => (
            <View key={row} style={styles.row}>
              <Text style={styles.leftLabel}>{leftLabels[row]}</Text>

              {/* Grid Cells */}
              {[0, 1, 2, 3].map((col) => (
                <TouchableOpacity
                  key={col}
                  style={[styles.cell, getCellStyle(row, col)]}
                  onPress={() => handleCellClick(row, col)}
                  disabled={isCellClicked(row, col)}
                >
                  <Image
                    source={isCellClicked(row, col) && 
                            clickedCells.find((cell) => cell.row === row && cell.col === col).isCorrect
                            ? correctImage
                            : isCellClicked(row, col) 
                            ? wrongImage 
                            : null}
                    style={styles.cellImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Clues Section */}
        <Text style={styles.CLUES}>CLUES</Text>
        <View style={styles.clueBox}>
          <Text style={styles.clues}>
            1. Date DD is double digit.{"\n"}
            2. Month MM is in winter season.{"\n"}
            3. Year YY is not an odd number.
          </Text>
        </View>

        {/* Instructions Footer */}
        <Text style={styles.solve}>How to solve:</Text>
        <Text style={styles.Solve}>Tap on the box which you think is correct for that row and column</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    paddingVertical: hp("2%"),
    width: wp("100%"),
    height: hp("100%"),
  },
  title: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: "#57C2EC",
    textAlign: "center",
    fontFamily: "Montserrat",
    marginBottom: hp("10%"),
    top: hp("5%"),
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  topRowPlaceholder: {
    width: boxSize, 
  },
  topNumber: {
    width: wp("20%"),
    textAlign: "center",
    fontSize: hp("2.5%"),
    color: "#5FFC3C",
  },
  gridContainer: {
    marginBottom: hp("5%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftLabel: {
    width: wp("12%"),
    textAlign: "center",
    fontSize: hp("2.5%"),
    color: "#5FFC3C",
    transform: [{ rotate: "90deg" }],
  },
  cell: {
    width: boxSize,
    height: boxSize,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#E470ED",
    backgroundColor: "transparent",
  },
  correctCell: {
    backgroundColor: "rgba(26, 220, 29, 0.21)",
  },
  wrongCell: {
    backgroundColor: "rgba(95, 13, 14, 0.28)",
  },
  cellImage: {
    width: hp("3%"),
    height: hp("3%"),
  },
  CLUES: {
    fontSize: hp("4%"),
    color: "#57C2EC",
    fontFamily: "Montserrat",
    textAlign: "left",
    alignSelf: "flex-start",  
    marginLeft: wp("5%"),  
    marginBottom: hp("1%"),
  },
  clueBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: hp("3%"),
    borderRadius: 10,
    width: wp("70%"),
    marginBottom: hp("2%"),
    borderWidth: 1,
    borderColor: "#57C2EC",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  clues: {
    fontSize: hp("2%"),
    color: "#FFFFFF",
    fontFamily: "Montserrat",
    textAlign: "left",
  },
  solve: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: "#FF92F8",
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  Solve: {
    fontSize: hp("2%"),
    color: "#FF8DF7",
    fontFamily: "Montserrat",
    textAlign: "center",
  },
});

export default Puzzle;
