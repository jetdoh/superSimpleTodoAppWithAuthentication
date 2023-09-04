import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      input: {
        height: 40,
        width: "80%",
        margin: 6,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      },
      button: {
        height: 50,
        width: 200,
        marginTop: 10,
        backgroundColor: "pink",
        padding: 10,
        borderWidth: 1,
        borderColor: "pink",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
      },
})

export default styles;