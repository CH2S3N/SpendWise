import { colors } from '@/constants/colors';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutUs = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
        <Text style={styles.header}>About Us</Text>
            <Text style={styles.paragraph}>
            <Text style={styles.subHeader}>Welcome to SpendWise!</Text>{'\n\n'}
            SpendWise is a mobile application developed as a thesis project for the Bachelor of Science in Computer Science program at Sorsogron State University Bulan Campus. Our goal is to provide users with a simple and efficient way to manage their personal finances through intelligent budgeting and planning features.
            </Text>

            <Text style={styles.subHeader}>Proponents</Text>
            <Text style={styles.paragraph}>
                Sancho Miguel B. Balmes{'\n'}
                Roy Alexander A. Santiago{'\n'}
                Joshua Vengie C. Ginaga{'\n'}
                Kc G. Peñalosa
            </Text>

            <Text style={styles.subHeader}>Our Mission</Text>
            <Text style={styles.paragraph}>
            To empower individuals to take control of their finances by offering an easy-to-use tool that simplifies budget planning, promotes smarter spending habits, and encourages saving.
            </Text>

            <Text style={styles.subHeader}>What Makes Us Different</Text>
            <Text style={styles.paragraph}>
            Unlike traditional budgeting apps, SpendWise automatically allocates your monthly income into Essentials, Non-Essentials, and Savings using a smart algorithm along with some financial management techniques such as the 50/30/20 rule. Users simply input their income and expenses, and the app handles the rest—no complicated setups or calculations needed.
            </Text>

            <Text style={styles.subHeader}>Why We Built This</Text>
            <Text style={styles.paragraph}>
            This app was created not only to fulfill academic requirements but also to address real-world financial challenges that many people face. As students, we recognized the importance of building better money habits early, and we wanted to offer a simple solution for others who feel the same.
            </Text>

            <Text style={styles.subHeader}>Acknowledgments</Text>
            <Text style={styles.paragraph}>
            This project was developed under the guidance of Ma'am Noemi D. Dioneda and with the support of the Information and Communication Technology department at Sorsogron State University Bulan Campus. We are grateful for the knowledge, feedback, and encouragement we've received throughout this journey.
            </Text>
      
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        color: colors.green,
        textAlign: 'center'
      },
      subHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 5,
        color: colors.green,
        textAlign: 'center'
      },
      paragraph: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
      },
      bold: {
        fontWeight: 'bold',
      },
});

export default AboutUs;