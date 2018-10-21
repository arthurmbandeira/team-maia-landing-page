module.exports = {
	secret: 'aedesalertasecret',
	session: { session: false },
	database: 'mongodb://127.0.0.1:27017/aedesalerta',
	pwa: {
		vapid: {
			public_key: 'BJPMhMNJxV2OHcsFpQzdu7-CGzB2nWvYURVFrHdRtiOH1PMEnCgCmFkEi-XyiaADdcKzXhMniEjxQYGEFnAqz6w',
			private_key: '17DefuyVjJxS7nbXXp9cc4rDfoOMRuve7GkME8Wrg50',
		}
	}
}