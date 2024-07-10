// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Button,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FC, useState, useEffect } from "react";
// import { Link } from "expo-router";

// const rectangleArray = [
//   { color: "yellow", weight: 100, text: "Hello Lord!" },
//   { color: "orange", weight: 200, text: "How are you?" },
//   { color: "cyan", weight: 300, text: "Haha!" },
// ];

// interface RectangleListProps {
//   quantity: number;
// }

// const RectangleList: FC<RectangleListProps> = ({ quantity }) => {
//   console.log("rerendered");
//   useEffect(() => {
//     console.log("RectangleList rendered");

//     // Cleanup effect
//     return () => {
//       console.log("RectangleList unmounted");
//     };
//   }, []);
//   const arr: RectangleProps[] = [];
//   for (let i = 0; i < quantity; i++) {
//     const randomIndex = Math.floor(Math.random() * rectangleArray.length);
//     arr.push(rectangleArray[randomIndex]);
//   }
//   return (
//     <>
//       {/* <Rectangle color='red' weight={100} text="Hello Lord!"/>
//       <Rectangle color='blue' weight={200} text="How are you?"/>
//       <Rectangle color='green' weight={300} text="Haha!"/> */}
//       {arr.map((rectangle, index) => (
//         <Rectangle
//           key={index}
//           color={rectangle.color}
//           weight={rectangle.weight}
//           text={rectangle.text}
//         />
//       ))}
//     </>
//   );
// };

// interface RectangleProps {
//   color: string;
//   weight: number;
//   text: string;
// }

// const Rectangle: FC<RectangleProps> = ({ color, weight, text }) => {
//   return (
//     <View style={[styles.rectangle, { backgroundColor: color }]}>
//       <Text>
//         {text} I am {weight} pounds!
//       </Text>
//     </View>
//   );
// };

// export default function App() {
//   const [numRectangles, setNumReatangles] = useState("0");
//   const [counter, setCounter] = useState(0);
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Button
//         title="Increment counter"
//         onPress={() => setCounter(counter + 1)}
//       />
//       <Text>Counter: {counter}</Text>
//       <Text> Enter a number to display a list of rectangles</Text>
//       <TextInput
//         style={styles.inputBox}
//         value={numRectangles}
//         onChangeText={setNumReatangles}
//       />
//       {Number(numRectangles) > 5 ? (
//         <ScrollView
//           style={styles.container}
//           contentContainerStyle={styles.contentContainer}
//         >
//           <RectangleList quantity={Number(numRectangles)} />
//           <StatusBar style="auto" />
//         </ScrollView>
//       ) : null}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   inputBox: {
//     borderWidth: 1,
//     padding: 5,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     // alignItems: 'center',
//     // justifyContent: 'flex-start',
//   },
//   contentContainer: {
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   rectangle: {
//     width: "100%",
//     height: 60,
//     backgroundColor: "red",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
