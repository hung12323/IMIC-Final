import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
import moment from 'moment';
import Head from './Head';
import Footer from './Footer';

const Detail1 = ({route}) => {
  const {title, content, image, timestamp} = route.params;
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState([]);

  const submitComment = () => {
    // Gửi bình luận lên Realtime Database
    database()
      .ref('comments')
      .push()
      .set({
        title: title,
        content: comment,
        username: username,
        likes: 0,
      })
      .then(() => {
        // console.log('Bình luận đã được lưu thành công vào Firebase.');
        Alert.alert('Comments thành công');
        setComment('');
        setUsername('');
      })
      .catch(error => {
        console.log('Lỗi khi lưu bình luận vào Firebase:', error);
      });
  };

  const likeComment = commentId => {
    // Tăng số lượng lượt thích của bình luận lên 1
    database()
      .ref(`comments/${commentId}/likes`)
      .transaction(likes => (likes || 0) + 1)
      .then(() => {
        console.log('Đã thích bình luận thành công.');
      })
      .catch(error => {
        console.log('Lỗi khi thích bình luận:', error);
      });
  };

  useEffect(() => {
    const commentsRef = database().ref('comments');
    commentsRef.on('value', snapshot => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const commentsList = Object.entries(commentsData).map(
          ([key, value]) => ({
            id: key,
            ...value,
          }),
        );
        const filteredComments = commentsList.filter(
          comment => comment.title === title,
        );
        setComments(filteredComments);
      } else {
        setComments([]);
      }
    });

    return () => commentsRef.off('value');
  }, [title]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Head />
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
        <Image source={{uri: image}} style={{width: '100%', height: 200}} />

        <Text
          style={{
            marginHorizontal: 10,
            fontWeight: 'bold',
            color: 'black',
            fontSize: 20,
            marginBottom: 20,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            marginHorizontal: 12,
            textAlign: 'justify',
          }}>
          {content}
        </Text>
        <Text style={styles.timestamp}>
          {moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
        <View>
          <Text style={{marginTop: 20}}>
            --------------------------------------------------------------------------------------------------
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              color: 'black',
              fontSize: 20,
            }}>
            Comments
          </Text>
        </View>
        {comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.image}
                source={require('../assets/Profile.png')}
              />
              <Text style={styles.commentText1}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.content}</Text>
            </View>

            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => likeComment(comment.id)}>
              <Text style={styles.likeButtonText}>Like ({comment.likes})</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={styles.commentInput}
          placeholder="Your name"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Enter your comment"
          value={comment}
          onChangeText={text => setComment(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={submitComment}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={{marginLeft: 20}}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  timestamp: {
    fontSize: 15,
    color: 'gray',
    marginTop: 15,
    textAlign: 'right',
    marginRight: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 5,
  },
  submitButton: {
    backgroundColor: '#3c64a8',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    marginLeft: 15,
  },

  commentText1: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
    marginLeft: 5,
  },
  likeButton: {
    marginTop: 5,
  },
  likeButtonText: {
    color: 'blue',
  },
  image: {
    height: 25,
    width: 25,
  },
});

export default Detail1;
