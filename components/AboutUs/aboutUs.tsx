import { colors } from "@/constants/colors"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const AboutUs = () => {
  return (
    <ScrollView>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.header}>About Us</Text>
            <Text style={styles.subHeader}>Welcome to SpendWise!</Text>
            <Text style={styles.paragraph}>
                SpendWise is a mobile application developed as a thesis project for the Bachelor of Science in Computer Science program at Sorsogon State University - Bulan Campus. Our goal is to provide users with a simple and efficient way to manage their personal finances through intelligent budgeting and planning features.
            </Text>
            <Text style={styles.subHeader}>Proponents</Text>
            <Text style={styles.paragraph}>
                Sancho Miguel B. Balmes{'\n'}
                Roy Alexander A. Santiago{'\n'}
                Joshua Vengie C. Ginaga{'\n'}
                Kc G. Peñalosa
            </Text>

            <Text style={styles.subHeader}>Thesis Adviser</Text>
            <Text style={styles.paragraph}>
                Noemi D. Dioneda {'\n'}
                Instructor 1
            </Text>

            <Text style={styles.subHeader}>Our Mission</Text>
            <Text style={styles.paragraph}>
                To empower individuals to take control of their finances by offering an easy-to-use tool that simplifies budget planning, promotes smarter spending habits, and encourages saving.
            </Text>

            <Text style={styles.subHeader}>What Makes Us Different</Text>
            <Text style={styles.paragraph}>
            Unlike traditional budgeting apps, SpendWise automatically allocates your monthly income into Essentials, Non-Essentials, and Savings using a smart algorithm along with some financial management techniques such as the 50/30/20 rule. Users simply input their income and expenses, and the app handles the rest, no complicated setups or calculations needed.            </Text>

            <Text style={styles.subHeader}>Why We Built This</Text>
            <Text style={styles.paragraph}>
                This app was created not only to fulfill academic requirements but also to address real-world financial challenges that many people face. As students, we recognized the importance of building better money habits early, and we wanted to offer a simple solution for others who feel the same.
            </Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default AboutUs

const styles = StyleSheet.create({
    container:{
      
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
          textAlign: 'center',
        color: colors.green,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: colors.green,
    },
    paragraph:{
        marginBottom: 10,
        textAlign: 'center',
        color: colors.dark,
    }
})