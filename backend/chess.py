class Chess:
    def __init__(self):
        self.turn = 'w'
        self.board = [[None] * 3] * 3
        self.captured = []
    
    def __str__(self):
        for x in self.board:
            for y in x:
                print() 