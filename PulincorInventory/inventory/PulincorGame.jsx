import React, { useEffect, useState, useRef } from "react";
import { View, Image, Text, TouchableOpacity, ImageBackground, Dimensions, Animated, PanResponder, Alert } from "react-native";
import { gameBackground, gameDecor, finishGameDecor, balloon, basket, fail1, fail2, fail3 } from "../merchandise/pulincorImgs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createForm, game, statistics } from "../merchandise/PulincorStyles";

const PulincorGame = () => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const basketSize = 170;
    const balloonSize = 40;
    const failSize = 82;

    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [balloonsCount, setBalloonsCount] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [fallingItems, setFallingItems] = useState([]);

    const basketX = useRef(new Animated.Value((screenWidth - basketSize) / 2)).current;
    const basketXY = useRef(new Animated.ValueXY({ x: (screenWidth - basketSize) / 2, y: 0 })).current;
    const basketRefX = useRef((screenWidth - basketSize) / 2);

    const gameInterval = useRef(null);
    const spawnInterval = useRef(null);

    useEffect(() => {
        const loadBestScore = async () => {
            try {
                const stored = await AsyncStorage.getItem('pulincorGameScores');
                if (stored) {
                    const scores = JSON.parse(stored);
                    const maxScore = Math.max(...scores, 0);
                    setBestScore(maxScore);
                }
            } catch (e) {
                Alert.alert("Failed to load best score:", e);
            }
        };
        loadBestScore();
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            basketX.extractOffset();
            basketX.addListener(({ value }) => basketRefX.current = value);
        }, 100);
        return () => clearInterval(id);
    }, []);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
            basketXY.setOffset({ x: basketXY.x._value, y: 0 });
            basketXY.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
            [null, { dx: basketXY.x }],
            { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
            basketXY.flattenOffset();
            },
        })
    ).current;

    const startGame = () => {
        setGameStarted(true);
        setGameFinished(false);
        setBalloonsCount(0);
        setFallingItems([]);
        spawnItems();
        gameInterval.current = setTimeout(endGame, 60000);
    };

    const endGame = async () => {
        clearInterval(spawnInterval.current);
        clearTimeout(gameInterval.current);
        setGameFinished(true);
        setGameStarted(false);

        try {
            const stored = await AsyncStorage.getItem('pulincorGameScores');
            const scores = stored ? JSON.parse(stored) : [];
            const updatedScores = [...scores, balloonsCount];
            await AsyncStorage.setItem('pulincorGameScores', JSON.stringify(updatedScores));
        } catch (e) {
            console.error("Failed to save game score:", e);
        }
    };

    const spawnItems = () => {
        spawnInterval.current = setInterval(() => {
            setFallingItems(items => {
                if (items.length >= 20) return items;

                const isBalloon = Math.random() > 0.3;
                const x = Math.random() * (screenWidth - (isBalloon ? balloonSize : failSize));
                const y = new Animated.Value(0);

                const id = Date.now() + Math.random();
                const type = isBalloon ? 'balloon' : 'fail';
                const size = isBalloon ? balloonSize : failSize;

                Animated.timing(y, {
                    toValue: screenHeight,
                    duration: 4000,
                    useNativeDriver: true
                }).start();

                const newItem = { id, type, x, y, size };

                monitorCollision(newItem);

                return [...items, newItem];
            });
        }, 700);
    };

    const monitorCollision = (item) => {
        const interval = setInterval(() => {
            item.y.addListener(({ value }) => {
                const basketY = screenHeight - basketSize;
                const itemBottom = value + item.size;
                const basketLeft = basketRefX.current;
                const basketRight = basketLeft + basketSize;

                const itemLeft = item.x;
                const itemRight = item.x + item.size;

                const isHorizontalOverlap = itemRight > basketLeft && itemLeft < basketRight;
                const isVerticalOverlap = itemBottom > basketY;

                if (isHorizontalOverlap && isVerticalOverlap) {
                    clearInterval(interval);

                    setFallingItems(curr => curr.filter(i => i.id !== item.id));

                    if (item.type === 'balloon') {
                        setBalloonsCount(c => c + 1);
                    } else {
                        endGame();
                    }
                }
            });
        }, 100);
    };

    const pulincorReplay = () => {
        startGame();
    };

    const pulincorExit = () => {
        setGameStarted(false);
        setGameFinished(false);
        setFallingItems([]);
        setBalloonsCount(0);
    };

    return (
        <ImageBackground source={gameBackground} style={{flex: 1}}>
            <View style={{ flex: 1, alignItems: 'center' }}>

                {
                    (!gameStarted && !gameFinished) && (
                        <View style={game.welcome}>

                            <View style={[statistics.card, {position: 'absolute', top: screenHeight * 0.1}]}>
                                <Text style={game.scoreTitle}>Best result:</Text>
                                <Text style={game.scoreText}>You've collected {bestScore} balloons !</Text>
                            </View>
                            
                            <Text style={game.title}>BALLOON UP</Text>

                            <Image source={gameDecor} style={game.decor} />

                            <TouchableOpacity
                                style={createForm.doneBtn}
                                onPress={startGame}
                            >
                                <Text style={createForm.doneBtnText}>Play</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }

                {(gameStarted && !gameFinished) && (
                    <>
                        {fallingItems.map(item => (
                            <Animated.View
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    left: item.x,
                                    width: item.size,
                                    height: item.size,
                                    transform: [{ translateY: item.y }]
                                }}
                            >
                                <Image
                                    source={item.type === 'balloon' ? balloon : [fail1, fail2, fail3][Math.floor(Math.random() * 3)]}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Animated.View>
                        ))}

                        <Animated.View
                            {...panResponder.panHandlers}
                            style={{
                                position: 'absolute',
                                bottom: screenHeight * 0.14,
                                width: basketSize,
                                height: basketSize,
                                transform: [{ translateX: basketXY.x }]
                            }}
                            >
                            <Image source={basket} style={{ width: '100%', height: '100%' }} />
                        </Animated.View>

                    </>
                )}

                {
                    (gameFinished) && (
                        <View style={[game.welcome, {paddingBottom: 100}]}>
                            
                            <Text style={game.title}>GAME OVER</Text>

                            <Text style={[game.title, {fontSize: 20}]}>YOU'VE COLLLECTED {balloonsCount} BALLOONS</Text>

                            <Image source={finishGameDecor} style={game.decor} />

                            <TouchableOpacity
                                style={createForm.doneBtn}
                                onPress={pulincorReplay}
                            >
                                <Text style={createForm.doneBtnText}>Replay</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[createForm.doneBtn, {backgroundColor: '#FF0000', marginTop: 10}]}
                                onPress={pulincorExit}
                            >
                                <Text style={createForm.doneBtnText}>Exit</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }
                
            </View>
        </ImageBackground>
    )
};

export default PulincorGame;