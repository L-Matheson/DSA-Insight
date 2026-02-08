import uuid
from fastapi import APIRouter, HTTPException
# Problems to cover: 5, 15, 16, 17, 20, 24, 30, 31


router = APIRouter(
    prefix='/algorithm-design/chapter-one',
    tags=['algorithm-design-chapter-one']
)

@router.get('/q5' )
async def question_five(int_a: int, int_b: int):
    """
        5. Write an algorithm that finds the greatest common divisor of two integers.
    """
    while int_b:
        int_a, int_b = int_b, int_a % int_b
        
    return int_a

@router.get('/q15' )
async def question_fifteen(n):
    """
        15. Show directly that f(n) = n^2 + 3n^3 ∈ Θ(n^3). That is, 
            use the definitions of O and Ω to show that f(n) is in both O(n^3) and Ω(n^3).
    """
    ans = n^2 + 3*n^3
    
    return 'This question is not yet implemented.'

@router.get('/q16' )
async def question_sixteen(n):
    """
        16. Using the definitions of O and Ω, show that 6n^2 + 20n ∈ O(n^3) but 6n^2 + 20n !∈ Ω(n^3).
    """
        
    return 'This question is not yet implemented.'

@router.get('/q17' )
async def question_seventeen(n):
    """
        17. Using the properties of order in Section 1.4.2, show that 5n^5 + 4n^4 + 6n^3 + 2n^2 + n + 7 ∈ Θ(n^5)
    """
        
    return 'This question is not yet implemented.'


@router.get('/q20' )
async def question_twenty(n):
    """
        20. The function f(x) = (log n)^2 + 2n + 4n + log n + 50 belongs in which of the following complexity categories:
                (a) θ(lg n)
                (b) θ((log n)^2)
                (c) θ(n)
                (d) θ(n lg n)
                (e) θ(n(lg n)^2)
                (f) None of these
    """
        
    return 'This question is not yet implemented.'


@router.get('/q24' )
async def question_twenty_four(n):
    """
        24. Discuss the reflexive, symmetric, and transitive properties for asymptotic comparisons (O, Ω, Θ, o).
    """
        
    return 'This question is not yet implemented.'

@router.get('/q30' )
async def question_thirty(n):
    """
        30. Consider the following algorithm: 
            (a) what is the output when n = 6, n = 8, and n = 10?
            (b) what is the time complexity T(n)? Assume that the input n is divisible by 2
    """
        
    return 'This question is not yet implemented.'

@router.get('/q31' )
async def question_thirty_one(n):
    """
        31. Consider the following algorithm: 
            (a) What is the output when n = 4, n = 16, n = 32?
            (b) What is the time complexity T(n). You may assume that n is divisible 4.
    """
        
    return 'This question is not yet implemented.'
