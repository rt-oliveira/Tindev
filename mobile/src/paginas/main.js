import React,{useEffect,useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View,SafeAreaView,Image,StyleSheet,Text,TouchableOpacity} from 'react-native';
import logo from '../imagens/logo.png';
import like from '../imagens/like.png';
import dislike from '../imagens/dislike.png';
import api from '../servicos/api';

export default function Main({navigation}){
    const id=navigation.getParam('user');
    const [usuarios,setUsuarios]=useState([]);

    useEffect(() => {
        async function carregarUsuarios(){
            const resposta= await api.get('/devs',{
                headers: {
                    usuario:id
                }
            })
            setUsuarios(resposta.data);
        }
        carregarUsuarios();
    }, [id]);

    async function Deslogar(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    async function darLike(){
        const [user,...resto]=usuarios;
        await api.post(`devs/${user._id}/likes`,null, {
            headers:{ usuario:id}
        });

        setUsuarios(resto);
    }

    async function darDislike(){
        const [user,...resto]=usuarios;
        await api.post(`devs/${user._id}/dislikes`,null, {
            headers:{ usuario:id}
        });

        setUsuarios(resto);
    }

    return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={Deslogar}>
            <Image style={styles.logo} source={logo}/>
        </TouchableOpacity>
        <View style={styles.cardsContainer}>
            {usuarios.length === 0 
            ? <Text style={styles.empty}>Acabou:(</Text> 
            : (usuarios.map(
                (user,index) =>  (
                    <View key={user._id} style={[styles.card,{zIndex:usuarios.length-index}]}>
                        <Image style={styles.avatar} source={{uri: user.avatar}}/>
                        <View style={styles.footer}>
                            <Text style={styles.name}>{user.nome}</Text>
                            <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                        </View>
                    </View>
                ))
            )}
        </View>
        {
            usuarios.length>0 && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={darDislike}>
                        <Image source={dislike}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={darLike}>
                        <Image source={like}/>
                    </TouchableOpacity>
                </View>
            )
        }
    </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    empty:{
        alignSelf:'center',
        color:'#999',
        fontSize:24,
        fontWeight:'bold'
    },
    logo:{
        marginTop:30
    },
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'space-between'
    },
    cardsContainer:{
        flex:1,
        alignSelf:'stretch',
        justifyContent:'center',
        maxHeight:500,
    },
    card:{
        borderWidth:1,
        borderColor:'#DDD',
        borderRadius:8,
        margin:30,
        overflow:'hidden',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0
    },
    avatar:{
        flex:1,
        height:300
    },
    footer:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:15
    },
    name:{
        fontSize:16,
        fontWeight:'bold',
        color:'#333'
    },
    bio:{
        fontSize:14,
        color:'#999',
        marginTop:5,
        lineHeight:18
    },
    buttonsContainer:{
        flexDirection:'row',
        marginBottom:30
    },
    button:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:20,
        elevation:2,
        shadowColor:'#000',
        shadowOpacity:0.05,
        shadowRadius:2,
        shadowOffset:{
            width:0,
            height:2
        }
    }
});