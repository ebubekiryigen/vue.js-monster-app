new Vue ({
    el : "#app",
    data : {
     you : 100,
     monster : 100,
     game_is_on : false,
     special_attack_right : 3,
     heal_up_right : 3,
     combo : 0,
     logs : [],
     text: {
         user_attack : "PLAYER ATTACK",
         special_attack : "SPECİAL PLAYER ATTACK",
         monster_attack : "MONSTER ATTACK",
         heal_up : "PLAYER HEAL UP ",
         give_up : "YOU GİVE UP AND GAME OVER",
         combo : "COOOOMMMMBBOOOOO !!! EXTRA LİFEEE  HEALT RİGHT",
         heal_warning : "OOPS! NO RIGHTS TO HEAL UP",
         special_warning : "OOPS! NO RIGHTS TO SPECIAL ATTACK",
         won : "YOU WON.",
         over : "GAME OVER. TRY AGAIN"
     }
    },
    methods : {
        start_game : function() {
            you = 100;
            monster = 100;
             this.game_is_on = true;

        },
        monster_attack : function() {
            var point = Math.ceil(Math.random() * 15);
            this.you -= point;
            this.add_to_log({turn : "M", text :  this.text.monster_attack + "("+ point +")"})

        },
        attack : function() {
           var point = Math.ceil(Math.random() * 10);
           this.monster -= point;
           this.add_to_log({turn : "Y", text : this.text.user_attack + "("+ point +")"})
           this.monster_attack();
           this.combo = 0;
        },
        special_attack : function() {
            this.special_attack_right -= 1;
            if(this.special_attack_right >= 0) {
            var point = Math.ceil(Math.random() *  (25 - 15) + 15);
            this.monster -= point;
            this.add_to_log({turn : "Y", text : this.text.special_attack + "("+ point +")"})
            this.combo += 1;
            if(this.combo == 3) {
                this.heal_up_right +=1;
                alert(this.text.combo)
            }
            this.monster_attack();
        }
        else {
            alert(this.text.special_warning)
        }
        },
        heal_up : function() {
            this.heal_up_right -= 1;
            if(this.heal_up_right >= 0) {
            var point = Math.ceil(Math.random() * 25);
            this.you += point;
            this.add_to_log({turn : "Y", text : this.text.heal_up + "("+ point +")"})
            this.combo = 0;
            this.monster_attack();
        }
        else {
            alert(this.text.heal_warning )
        }
        },
        give_up : function() {
        this.add_to_log({turn : "Y", text : this.text.give_up })
        this.you = 0;
        },
        add_to_log : function(log) {
              this.logs.push(log);
        }

    },
    watch : {
        you : function(value) {
            if(value <= 0) {
                this.you = 0;
                if (confirm(this.text.over)) {
                    this.you = 100;
                    this.monster = 100;
                    this.special_attack_right = 3;
                    this.heal_up_right = 3;
                    this.logs = [];
                }
            }
            else if( value >= 100) {
               this.you = 100;
            }
        },
        monster : function(value) {
            if(value <= 0) {
                this.monster = 0;
                if (confirm(this.text.won)) {
                    this.you = 100;
                    this.monster = 100;
                    this.special_attack_right = 3;
                    this.heal_up_right = 3;
                    this.logs = [];
                }
            }
            else if( value >= 100) {
               this.monster = 100;
            }
        }
    },
    computed : {
        user_progress : function() {
            return {
                width : this.you + "%"
            }
        },
        monster_progress : function() {
            return {
                width : this.monster + "%"
            }
        }
    }
      
})