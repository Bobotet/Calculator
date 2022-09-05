"use strict"

//pattern - введённый пользователем пример
let pattern = [];
//delete_mas - массив для удаления элемента по одному
let delete_mas = [];


//Функция, которая определяет, что нажал пользователь и какие операции в дальнейшем нужно провести
function inp(clas){
	//Если длинна массива превышает 19 символов, то пользователь может лишь удалять и получать ответ (не может дописывать пример)
	if(pattern.length >= 19){
		//Если пользователь нажал на кнопку удаления одного элемента
		if (clas == 'delete-one'){	
			//Если при этом длинна примера равна одному символу или "Ошибка", то мы очищаем всю строку
			if ((pattern.length == 1) || (document.getElementById('output_window').value == 'Ошибка')){
				pattern = '';
		}
			//Если длинна введённого примера не равна 1, то мы закладываем в delete_mas значение примера в форме 
			//массива (разбивая на массив посимвольно)
			else{
				delete_mas = document.getElementById('output_window').value.split('');
				//Если последний элемент является пробелом, то мы удаляем три последний элемента, тк элементы, которые
				//содержат пробелы спереди, содержит их и сзади
				if (delete_mas[delete_mas.length - 1] == ' '){
					delete_mas.pop();
					delete_mas.pop();
					delete_mas.pop();
				}
				//Если же последний элемент не пробел, то мы просто удаляем его
				else{
					delete_mas.pop();
				}
				//И записываем в значение примера то, что не удалил пользователь(не пишем то, что он удалил)
				pattern = delete_mas.join('');
			}
			//Выводим теперешнее значение примера
			document.getElementById('output_window').value = pattern;
		}
		// Ежели пользователь нажал кнопку "Удалить всё", то мы просто обнуляем наш пример
		else if (clas == 'delete-all'){
			pattern = '';
			document.getElementById('output_window').value = pattern;
		}
		//Если пользователь нажал равно, то мы обращаемся к функции, которая непосредственно будет вычислять значение
		//ответа примера
		else if(clas == 'equals'){
			calculate(pattern.split(' '));
		}
	}
	//Если программа не превышает 19 символов, то пользователь может дописывать пример и делать всё,что мог делать выше
	else{
		if (clas == 'delete-one'){	
			if ((pattern.length == 1) || (document.getElementById('output_window').value == 'Ошибка')){
				pattern = '';
		}
		else{
			delete_mas = document.getElementById('output_window').value.split('');
			if (delete_mas[delete_mas.length - 1] == ' '){
				delete_mas.pop();
				delete_mas.pop();
				delete_mas.pop();
			}
			else{
				delete_mas.pop();
			}
			pattern = delete_mas.join('');
		}
		
		document.getElementById('output_window').value = pattern;
		}
		else if (clas == 'delete-all'){
			pattern = '';
			document.getElementById('output_window').value = pattern;
		}
		else if(clas == 'equals'){
			calculate(pattern.split(' '));
		}
		//Ежели пользователь нажал на цифру, знак или точку, то она добавляется в pattern
		else{
			pattern += clas
			document.getElementById('output_window').value = pattern;
		}
	}
		
}

//Нормер последней открывающейся скобки
let open_num;
//Номер последней закрывающейся скобки
let close_num;
//Факт наличия открывающейся скобки
let open_num_true = false;
//Факт наличия закрывающейся скобки
let close_num_true = false;


//Функция, которая непосредственно считает пример
function calculate(primer){
	//Цикл в 50 итераций для того,чтобы точно всё просчитать (с первой итерации может не получится)
	for(let l = 0; l < 50; l++){
		//Изначально считаем, что скобок нет
		open_num_true = false;
		close_num_true = false;
		//Проверяем на наличие скобок (если их несколько, то изначально считаются самые последние)
		for(let i = 0; i < primer.length; i++){
			//Если открывающая скобка есть, то запоминаем положение следующего за ней элемента
			if(primer[i] == '('){
				open_num = i + 1;
				open_num_true = true;
			}
			//Если закрывающая скобка есть, то запоминаем положение идущего перед ней элемента
			else if(primer[i] == ')'){
				close_num = i - 1;
				close_num_true = true;
			}
		}
		// Если скобок нет, то открывающее число = 0 а закрывающее - длинне массива, чтобы посчитать сразу весь пример
		if((open_num_true == false) && (close_num_true == false)){
			open_num = 0;
			close_num = primer.length;
		}
		//Если скобки есть, то открывающее и закрывающее числа это первое и последнее числа из скобок
		else if((open_num_true == true) && (close_num_true == true)){
			primer[open_num - 1] = '';
			primer[close_num + 1] = '';
		}
		//Этот вариант предполагает отсутствие либо открывающей, либо закрывающей скобки при наличии другой
		else{
			document.getElementById('output_window').value = "Ошибка";

		}
		
		//Цикл работает по примеру в скобках(если они есть), или по всему примеру, если скобок нет
		for(let i = open_num; i < close_num; i++){
		//Если каким-то образом элементом массива получается пробел(возможно, поставили два знака подряд), то выдаёт ошибку
		//два плюса и минуса подряд являются исключениями
			if(primer[i] === ' '){
				document.getElementById('output_window').value = "Ошибка";

			}
			//Если за знаком идёт другой знак, то выдаёт ошибку
			if(primer[i] == '×'){
				if((primer[i + 1] == '') || (primer[i + 1] == '+') || (primer[i + 1] == '-') || (primer[i + 1] == '×') || (primer[i + 1] == '÷')){
					document.getElementById('output_window').value = "Ошибка";
				}
				//если после знака идут числа, то считаем
				else{
					primer.splice(i - 1, 3, Number(primer[i - 1]) * Number(primer[i + 1]));
					pattern = primer;
					document.getElementById('output_window').value = primer;
					i -= 3;
					continue;
				}
				
			}
			else if(primer[i] == '÷'){
				if((primer[i + 1] == '') || (primer[i + 1] == '+') || (primer[i + 1] == '-') || (primer[i + 1] == '×') || (primer[i + 1] == '÷')){
					document.getElementById('output_window').value = "Ошибка";
				}
				else if(primer[i - 1] / primer[i + 1] == Infinity){
					document.getElementById('output_window').value = 'Ошибка';

				}
				else{
					primer.splice(i - 1, 3, Number(primer[i - 1]) / Number(primer[i + 1]));
					pattern = primer;
					document.getElementById('output_window').value = primer;
					i -= 3;
					continue;
				}
				
			}
		}
		for(let i = open_num; i < close_num; i++){
			if(primer[i] == '+'){
				primer.splice(i - 1, 3, Number(primer[i - 1]) + Number(primer[i + 1]));
				pattern = primer;
				document.getElementById('output_window').value = primer;
				i -= 3;
				continue;
			}
			else if(primer[i] == '-'){
				if(primer[i + 1] == ''){
					if(primer[i + 2] == '-'){
						primer.splice(i, 3, '+');
						pattern = primer;
						document.getElementById('output_window').value = primer;
						i -= 3;
						continue;
					}

					
				}
				else{
					primer.splice(i - 1, 3, Number(primer[i - 1]) - Number(primer[i + 1]));
					pattern = primer;
					document.getElementById('output_window').value = primer;
					i -= 3;
					continue;
				}
				
			}
		}
		//Удаляем пустые ячейки, которые ,в основном, остаются после удаления скобок
		for(let k = 0; k <= primer.length; k++){
			for(let i = 0; i <= primer.length; i++){
				if(primer[i] === ""){
					primer.splice(i, 1);
					document.getElementById('output_window').value = primer;
				}
			}
		}
		//Если происходят какие-то незапланированные ошибки, выводит ошибку
		if(isNaN(document.getElementById('output_window').value)){
			document.getElementById('output_window').value = 'Ошибка'
		}	
	}
		
	
}
