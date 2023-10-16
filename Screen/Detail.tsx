import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Head from './Head';
import Footer from './Footer';
const Detail = () => {
  const navigation = useNavigation();
  // var Firebase = require(firebase);
  // class
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginLeft: -150}}>
          <Head />
        </View>

        <Text
          style={{
            marginTop: 60,
            marginLeft: -210,
            fontSize: 20,
            color: 'black',
            marginBottom: 10,
          }}>
          News Detail
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={require('../assets/7.png')} />

        <Text style={styles.text}>
          Chìm tàu, 15 người trôi dạt nhiều giờ trên biển
        </Text>
        <Text style={styles.text1}>
          Tàu cá bị sóng đánh chìm, 15 thuyền viên ôm phao, lưới lênh đênh hơn 4
          giờ trên biển trước khi biên phòng và ngư dân ra ứng cứu. Sáng qua,
          tàu cá do ông Danh Sóc Kha, 39 tuổi, quê huyện An Biên, tỉnh Kiên
          Giang, làm thuyền trưởng chở 14 người từ cửa Kinh Hội (huyện U Minh)
          ra biển đánh bắt.
        </Text>
        <Text style={styles.text2}>
          Khoảng 17h45 phút cùng ngày, khi tàu hoạt động cách bờ khoảng 8 hải lý
          (gần 15 km) về hướng tây bắc đã bị sóng to, kết hợp gió mạnh đánh
          chìm. Thuyền trưởng điện báo biên phòng, đồng thời yêu cầu các thuyền
          viên ôm phao, lưới bám trụ dưới nước gần nơi tàu chìm. Đồn Biên phòng
          Khánh Hội (Bộ đội Biên phòng tỉnh Cà Mau) cử 10 cán bộ, chiến sỹ và
          huy động 2 tàu cá ngư dân địa phương ra cứu nạn, đồng thời thông báo
          cho các tàu cá hoạt động gần vị trí tàu cá chìm đến hỗ trợ. Hai giờ
          sau, tàu cá của ông Phan Văn Khánh ở huyện U Minh đã cứu vớt được một
          thuyền viên. Đến 21h, lực lượng biên phòng tìm thấy 14 người còn lại,
          đưa vào bờ chăm sóc.
        </Text>
      </ScrollView>
      <View style={{marginBottom: 170}}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  head: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    marginBottom: 20,
    // marginTop: 150,
    // marginTop: 40,
    marginLeft: 1,
  },
  anh1: {
    marginLeft: -10,
    marginTop: 50,
  },
  anh2: {
    marginLeft: 330,
    marginTop: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  text1: {
    fontSize: 18,

    marginHorizontal: 20,
    marginTop: 15,
    color: 'black',
  },
  text2: {
    fontSize: 18,

    marginHorizontal: 20,
    marginTop: 5,
    color: 'black',
  },
  image1: {
    width: '88%',
    height: 150,
    marginHorizontal: 17,
    marginVertical: 15,
  },
});

export default Detail;
