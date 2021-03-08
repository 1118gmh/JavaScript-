### Promise设计模式

> Promise是ES6中新增加的内置类：目的是为了管理异步操作的

```
1. new Promise() 创建一个类的实例，每一个是来都可以管理一个异步操作
	-> 必须传递一个回调函数进去（回调函数中管理你的异步操作），不传递会报错
	-> 回调函数中有两个参数
		resolve：异步操作成功要做的事情（代指成功后 的事件队列=>成功后要做的所有事情都存放到这个事件队列中）
		reject：异步操作失败哟啊做的事情（代指失败后的事件队列）
	-> new Promise的时候立即把回调函数执行了（Promise是同步的）
	let promise = new Promise(()=>{
		$.ajax(...)
	});
	
2. 基于Promise.prototype.then方法（还有catch / finally 两个方法）向成功队列和失败队列中依次加入需要处理的事情
	-> 如果是多个then调用，不是像我们想象的依次把增加的方法执行，异步操作成功或者失败，先把第一个then中的方法执行，每执行一个then会返回一个新的Promise实例，这个实例管控的是第一个then中方法执行的成功还是失败
	promise.then(result=>{ promise管控当前then中的成功或失败，执行完返回新的promise1
		...
	}).then(result=>{  promise1管控当前then中的成功或者失败，执行完返回新的promise2
		...
	}).then(result=>{ promise2...
		...
	});
	->建议不要使用then中的第二个参数（这样看起来很乱），而是建议 我们使用Promise原型上的cache方法来管理我们的代码。
	promise.then(result=>{ 异步请求成功则执行then中方法
		...
	}).catch(()=>{ 异步请求失败或第一个then方法执行失败，则执行catch
		...
	}).then(()=>{ 上一个then和catch执行成功，则执行then
	
	}).catch(()=>{
	
	}).finally(()=>{ //不管代码上一个promise成功还是失败都执行finally
	});
	
3. 基于Promise解决回调地狱
	//封装基于AJAX异步获取的数据
	let queryA = function(){
		return new Promise(()=>{
			$.ajax({
				url:'...',
				success:result =>{
					resolve(result);
				}
			});
		});
	};
	let queryB = function(){
		return new Promise(()=>{
			$.ajax({
				url:'...',
				success:result =>{
					resolve(result);
				}
			});
		});
	};
	let queryC = function(){
		return new Promise(()=>{
			$.ajax({
				url:'...',
				success:result =>{
					resolve(result);
				}
			});
		});
	};
	//基于Promise管理异步获取的数据
	let promise = queryA();
	promise.then(result=>{
		//操作queryA获取到的数据
		//....
		return queryB(); //在执行完queryB后获取到具体值后才能将这个具体值返回给下一个then
	}).then(res=>{
		//操作queryB获取到的数据
		//....
		return queryC();		
	}).then(res=>{
		//操作queryC获取到的数据
		//....
	});
	
```



