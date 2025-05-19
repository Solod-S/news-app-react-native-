import { Colors } from "@/constants/Colors";
import { Linking, ScrollView, StyleSheet, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutPage = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>About Us</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Mezha</Text> is an information outlet that
          reports on politics, society, and all key events in Ukraine. We adhere
          to principles of neutrality, objectivity, and transparency.
        </Text>

        <Text style={styles.paragraph}>
          You can always visit our{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://mezha.net/ua")}
          >
            official website
          </Text>{" "}
          for more. We go beyond written content — actively producing video
          content on our{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://www.youtube.com/@mezha_net")
            }
          >
            YouTube
          </Text>{" "}
          channel. You can also find us on platforms like{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/mezha_net")
            }
          >
            Instagram
          </Text>
          ,{" "}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL("https://www.facebook.com/mezha.net")
            }
          >
            Facebook
          </Text>
          ,{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://www.tiktok.com/@mezha_net")}
          >
            TikTok
          </Text>{" "}
          and{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://twitter.com/mezha_net")}
          >
            X (Twitter)
          </Text>
          .
        </Text>

        <Text style={styles.subheading}>Our Values</Text>
        <Text style={styles.paragraph}>
          We believe in equality and justice. There&apos;s no place for
          discrimination based on religion, skin color, gender, or social
          status.
        </Text>

        <Text style={styles.subheading}>Advertising</Text>
        <Text style={styles.paragraph}>
          We do not promote gambling, alcohol, tobacco, or other products that
          can negatively affect health. We welcome advertising on our platform
          if it aligns with our principles and values.
        </Text>

        {/* <Text style={styles.subheading}>Language</Text>
        <Text style={styles.paragraph}>
          All our content is in the official state language. Comments in foreign
          languages may be translated or adapted for our audience to ensure
          clarity and accessibility.
        </Text> */}

        <Text style={styles.subheading}>Opinions</Text>
        <Text style={styles.paragraph}>
          Articles in the &quot;Opinions&quot; section reflect the views of
          their authors. These views may not align with the editorial position
          of Mezha.
        </Text>

        <Text style={styles.paragraph}>
          Content from our website may be used only with a direct link to{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://mezha.net")}
          >
            mezha.net
          </Text>
          . We appreciate your respect for our intellectual property.
        </Text>

        <Text style={styles.subheading}>Contact</Text>
        <Text
          style={[styles.paragraph, styles.link]}
          onPress={() => Linking.openURL("mailto:contact@mezha.net")}
        >
          contact@mezha.net
        </Text>

        <Text style={styles.legal}>
          The editorial office is not responsible for facts and opinions
          expressed in advertising materials. Under Ukrainian law, advertisers
          bear responsibility for the content of advertisements.
        </Text>

        <Text style={styles.legal}>LLC “MEZHA NET”. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  heading: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.black,
  },
  subheading: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: Colors.black,
  },
  paragraph: {
    fontSize: hp(1.7),
    lineHeight: 20,
    marginBottom: 12,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    color: "#1D4ED8",
    textDecorationLine: "underline",
  },
  legal: {
    fontSize: hp(1.3),
    color: Colors.darkGrey,
    opacity: 0.7,
    marginTop: 10,
  },
});
