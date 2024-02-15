from posixpath import join


class ProofException(Exception):
    def __init__(self, phase, issues):
        newline = '\n'
        self.message = f"\n\nflow is not flawless in {phase}:\n\n{newline.join(str(issue) for issue in issues)}"
        super().__init__(self.message)
